// Jooble job-search client (drop-in replacement for Adzuna).
// Docs: https://jooble.org/api/about
// Free tier: register at https://jooble.org/api/about to get an API key.

export type JoobleJob = {
    id: string;
    title: string;
    company: string;
    location: string;
    url: string;
    description: string;
    createdAt: string;
    salary?: string;
};

// Keep backward-compatible alias so other files that import AdzunaJob still compile.
export type AdzunaJob = JoobleJob;

type RawJoobleJob = {
    title?: string;
    company?: string;
    location?: string;
    snippet?: string;
    salary?: string;
    source?: string;
    type?: string;
    link?: string;
    updated?: string;
    id?: string;
};

export async function searchJobs(params: {
    what: string;
    country?: string;
    where?: string;
    resultsPerPage?: number;
}): Promise<JoobleJob[]> {
    const apiKey = process.env.JOOBLE_API_KEY;
    if (!apiKey) {
          throw new Error("Jooble API key not configured");
    }

  const url = `https://jooble.org/api/${apiKey}`;

  const body = JSON.stringify({
        keywords: params.what,
        location: params.where || "",
  });

  const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body,
  });

  if (!res.ok) {
        throw new Error(`Jooble HTTP ${res.status}`);
  }

  const data = (await res.json()) as {
        totalCount?: number;
        jobs?: RawJoobleJob[];
  };

  const jobs = data.jobs || [];
    const limit = params.resultsPerPage ?? 8;

  return jobs.slice(0, limit).map((j) => ({
        id: j.id || String(Math.random()),
        title: j.title || "Untitled",
        company: j.company || "Unknown",
        location: j.location || "Remote / Unspecified",
        url: j.link || "#",
        description: stripHtml(j.snippet || "").slice(0, 240),
        createdAt: j.updated || new Date().toISOString(),
        salary: j.salary || undefined,
  }));
}

function stripHtml(s: string): string {
    return s.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#?\w+;/g, " ").replace(/\s+/g, " ").trim();
}
