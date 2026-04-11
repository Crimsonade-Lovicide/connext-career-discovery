import { anthropic, MODEL } from "@/lib/anthropic";
import { scoreAll, type Response as AssessmentResponse } from "@/lib/assessments/scoring";
import { QUESTIONS } from "@/lib/assessments/questions";
import { matchCareers } from "@/lib/careers/match";
import { getClientKey, rateLimit } from "@/lib/rateLimit";
import { generateSlug, insertReport, supabaseConfigured } from "@/lib/supabase";

export const runtime = "nodejs";

const VALID_IDS = new Set(QUESTIONS.map((q) => q.id));

type Body = {
  name?: unknown;
  responses?: unknown;
};

function validate(body: Body): { ok: true; name: string; responses: AssessmentResponse[] } | { ok: false; error: string } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid body" };

  const name = typeof body.name === "string" ? body.name.slice(0, 60).trim() : "";

  if (!Array.isArray(body.responses)) return { ok: false, error: "responses must be an array" };
  if (body.responses.length > QUESTIONS.length + 5) return { ok: false, error: "Too many responses" };

  const clean: AssessmentResponse[] = [];
  for (const r of body.responses) {
    if (!r || typeof r !== "object") return { ok: false, error: "bad response shape" };
    const { id, value } = r as { id?: unknown; value?: unknown };
    if (typeof id !== "string" || !VALID_IDS.has(id)) return { ok: false, error: "unknown question id" };
    if (typeof value !== "number" || value < 1 || value > 5 || !Number.isFinite(value)) {
      return { ok: false, error: "value must be 1-5" };
    }
    clean.push({ id, value });
  }
  if (clean.length < Math.floor(QUESTIONS.length * 0.8)) {
    return { ok: false, error: "not enough responses" };
  }
  return { ok: true, name, responses: clean };
}

export async function POST(request: Request) {
  // Rate limit: 5 reports per IP per hour (best effort, per instance)
  const key = getClientKey(request);
  const rl = rateLimit(`report:${key}`, 5, 60 * 60 * 1000);
  if (!rl.ok) {
    return Response.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  let json: Body;
  try {
    json = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const v = validate(json);
  if (!v.ok) return Response.json({ error: v.error }, { status: 400 });

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Server missing ANTHROPIC_API_KEY" },
      { status: 500 }
    );
  }

  const scores = scoreAll(v.responses);
  const careers = matchCareers(scores, 8);

  const prompt = `You are writing a personality + career report for ConnexT, a career discovery tool.

The user's name: ${v.name || "there"}

Big Five scores (0-100):
- Openness: ${scores.bigFive.O}
- Conscientiousness: ${scores.bigFive.C}
- Extraversion: ${scores.bigFive.E}
- Agreeableness: ${scores.bigFive.A}
- Emotional Steadiness: ${scores.bigFive.steadiness}

Holland Code (RIASEC): ${scores.riasecCode}
- Realistic: ${scores.riasec.R}
- Investigative: ${scores.riasec.I}
- Artistic: ${scores.riasec.A}
- Social: ${scores.riasec.S}
- Enterprising: ${scores.riasec.E}
- Conventional: ${scores.riasec.C}

Top career matches (already pre-selected algorithmically):
${careers.map((c, i) => `${i + 1}. ${c.title} — ${c.blurb}`).join("\n")}

Write a report with exactly these sections in markdown:

## Who you are
A warm, specific 2-3 paragraph portrait. Reference the actual score patterns (e.g. "your high openness paired with moderate extraversion..."). No jargon dumps. Speak directly to the user using "you".

## How you work best
Bullet points: environments where they'll thrive, kinds of teammates that complement them, and 1-2 things to watch out for.

## Careers that fit you
For each of the top 5 careers above, write 1-2 sentences explaining *why* it fits THIS person's specific profile — not generic descriptions. Use the career titles exactly as given.

## What to explore next
3-5 concrete suggestions (courses, books, types of side projects, conversations to have) tailored to their profile.

Tone: warm, insightful, specific, never generic. Avoid clichés like "passionate" and "dynamic". Do not mention Myers-Briggs or Enneagram. Do not caveat that this is a short test.`;

  try {
    const msg = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });
    const text = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("\n");

    // Persist to Supabase if configured, otherwise return ephemerally.
    let slug: string | null = null;
    if (supabaseConfigured()) {
      try {
        slug = generateSlug();
        await insertReport({
          slug,
          name: v.name,
          responses: v.responses,
          scores,
          careers,
          report: text,
        });
      } catch (err) {
        // Persistence failure should not block returning the report.
        console.error("Supabase insert failed:", err);
        slug = null;
      }
    }

    return Response.json({ scores, careers, report: text, slug });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return Response.json({ error: `LLM error: ${msg}` }, { status: 502 });
  }
}
