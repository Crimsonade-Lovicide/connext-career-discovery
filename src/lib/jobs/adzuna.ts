// Minimal Adzuna client.
// Docs: https://developer.adzuna.com/docs/search
// Free tier: register at https://developer.adzuna.com/ to get APP_ID + APP_KEY.

export type AdzunaJob = {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  createdAt: string;
  salary?: string;
};

type RawJob = {
  id: string;
  title: string;
  company?: { display_name?: string };
  location?: { display_name?: string };
  redirect_url: string;
  description: string;
  created: string;
  salary_min?: number;
  salary_max?: number;
  salary_is_predicted?: string;
};

function formatSalary(j: RawJob): string | undefined {
  if (j.salary_min == null && j.salary_max == null) return undefined;
  const fmt = (n: number) =>
    `$${Math.round(n / 1000)}k`;
  if (j.salary_min && j.salary_max && j.salary_min !== j.salary_max) {
    return `${fmt(j.salary_min)}–${fmt(j.salary_max)}`;
  }
  return fmt(j.salary_min ?? j.salary_max!);
}

export async function searchJobs(params: {
  what: string;
  country?: string; // e.g. "us", "gb"
  where?: string;
  resultsPerPage?: number;
}): Promise<AdzunaJob[]> {
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;
  if (!appId || !appKey) {
    throw new Error("Adzuna credentials not configured");
  }

  const country = params.country || "us";
  const url = new URL(
    `https://api.adzuna.com/v1/api/jobs/${country}/search/1`
  );
  url.searchParams.set("app_id", appId);
  url.searchParams.set("app_key", appKey);
  url.searchParams.set("what", params.what);
  url.searchParams.set("results_per_page", String(params.resultsPerPage ?? 8));
  url.searchParams.set("content-type", "application/json");
  if (params.where) url.searchParams.set("where", params.where);

  const res = await fetch(url.toString(), {
    // Cache for 15 minutes at the edge — same title queries are common.
    next: { revalidate: 900 },
  });
  if (!res.ok) {
    throw new Error(`Adzuna HTTP ${res.status}`);
  }
  const data = (await res.json()) as { results?: RawJob[] };
  const results = data.results || [];

  return results.map((j) => ({
    id: j.id,
    title: j.title,
    company: j.company?.display_name || "Unknown",
    location: j.location?.display_name || "Remote / Unspecified",
    url: j.redirect_url,
    description: stripHtml(j.description).slice(0, 240),
    createdAt: j.created,
    salary: formatSalary(j),
  }));
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}
