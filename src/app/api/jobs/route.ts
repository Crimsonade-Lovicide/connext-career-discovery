import { searchJobs } from "@/lib/jobs/jooble";
import { getClientKey, rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const key = getClientKey(request);
  const rl = rateLimit(`jobs:${key}`, 30, 60 * 60 * 1000);
  if (!rl.ok) {
    return Response.json(
      { error: "Rate limit exceeded. Try again later." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 100).trim();
  const where = searchParams.get("where")?.slice(0, 60).trim() || undefined;
  const country = searchParams.get("country")?.slice(0, 4).trim() || "us";

  if (!title) {
    return Response.json({ error: "title is required" }, { status: 400 });
  }

  try {
    const jobs = await searchJobs({ what: title, where, country });
    return Response.json({ jobs });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return Response.json({ error: msg }, { status: 502 });
  }
}
