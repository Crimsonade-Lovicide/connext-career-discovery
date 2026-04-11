// Thin Supabase REST helper — no client library dependency.
//
// Uses the PostgREST endpoint that Supabase exposes at {SUPABASE_URL}/rest/v1.
// Server-side writes use the service_role key (bypasses RLS).
// Public reads use the anon key and are constrained by the RLS policy.

import type { Scores, Response as AssessmentResponse } from "@/lib/assessments/scoring";
import type { CareerMatch } from "@/lib/careers/match";

export type StoredReport = {
  id: string;
  slug: string;
  name: string;
  responses: AssessmentResponse[];
  scores: Scores;
  careers: CareerMatch[];
  report: string;
  created_at: string;
};

export type NewReport = Omit<StoredReport, "id" | "created_at">;

function env(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

export function supabaseConfigured(): boolean {
  return !!env("SUPABASE_URL") && !!env("SUPABASE_ANON_KEY");
}

function endpoint(path: string): string {
  const base = env("SUPABASE_URL");
  if (!base) throw new Error("SUPABASE_URL is not set");
  return `${base.replace(/\/$/, "")}/rest/v1${path}`;
}

/**
 * Generate a short, readable, unguessable-enough slug.
 * Alphabet excludes lookalikes (0/o, 1/l/i).
 */
export function generateSlug(length = 10): string {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < length; i++) {
    out += alphabet[bytes[i] % alphabet.length];
  }
  return out;
}

/**
 * Insert a new report row using the service_role key.
 * Returns the inserted row (including the server-generated id/created_at).
 */
export async function insertReport(row: NewReport): Promise<StoredReport> {
  const serviceKey = env("SUPABASE_SERVICE_ROLE_KEY");
  if (!serviceKey) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set");

  const res = await fetch(endpoint("/reports"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase insert failed: ${res.status} ${text}`);
  }
  const rows = (await res.json()) as StoredReport[];
  if (!rows[0]) throw new Error("Supabase insert returned no row");
  return rows[0];
}

/**
 * Fetch a single report by slug using the anon key (read-only, RLS-restricted).
 * Returns null when not found.
 */
export async function getReportBySlug(slug: string): Promise<StoredReport | null> {
  const anonKey = env("SUPABASE_ANON_KEY");
  if (!anonKey) throw new Error("SUPABASE_ANON_KEY is not set");

  const url =
    endpoint("/reports") +
    `?slug=eq.${encodeURIComponent(slug)}` +
    `&select=id,slug,name,responses,scores,careers,report,created_at`;

  const res = await fetch(url, {
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
    },
    // Cache a shared report for 5 minutes at the edge.
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`Supabase fetch failed: ${res.status}`);
  }
  const rows = (await res.json()) as StoredReport[];
  return rows[0] ?? null;
}
