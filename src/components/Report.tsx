"use client";

import { useState } from "react";
import type { Scores } from "@/lib/assessments/scoring";
import type { CareerMatch } from "@/lib/careers/match";

export type ReportProps = {
  report: string;
  scores: Scores;
  careers: CareerMatch[];
  /** Public slug — when present, enables the Share button. */
  slug?: string | null;
  /** When present, shows a Start-over CTA and calls this on confirm. */
  onReset?: () => void;
  /** When true, hides the "saved locally" sub-line (used on public share view). */
  readOnly?: boolean;
};

export default function Report({
  report,
  scores,
  careers,
  slug,
  onReset,
  readOnly = false,
}: ReportProps) {
  const confirmReset = () => {
    if (
      window.confirm(
        "Start over? This will erase your current report and answers."
      )
    ) {
      onReset?.();
    }
  };

  return (
    <div className="space-y-10">
      <div className="text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-white/40 mb-3">
          {readOnly ? "A ConnexT report" : "Your report"}
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl tracking-tight">
          A portrait <span className="italic text-white/70">of you.</span>
        </h2>
        {!readOnly && (
          <p className="mt-4 text-xs text-white/40">
            Saved locally · returns automatically next time you visit
          </p>
        )}
        <div className="hairline h-px w-24 mx-auto mt-8" />
      </div>

      {slug && <ShareBar slug={slug} />}

      <section className="fade-up surface-report rounded-3xl p-7">
        <h3 className="text-[11px] uppercase tracking-[0.28em] text-white/40 mb-6">
          Profile at a glance
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <ScoreBar label="Openness" value={scores.bigFive.O} />
          <ScoreBar label="Conscientiousness" value={scores.bigFive.C} />
          <ScoreBar label="Extraversion" value={scores.bigFive.E} />
          <ScoreBar label="Agreeableness" value={scores.bigFive.A} />
          <ScoreBar label="Emotional Steadiness" value={scores.bigFive.steadiness} />
          <div className="relative rounded-2xl p-4 overflow-hidden border border-violet-400/20 bg-gradient-to-br from-violet-500/10 to-fuchsia-500/5">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-500/20 rounded-full blur-3xl" />
            <p className="relative text-[10px] uppercase tracking-[0.22em] text-white/50">
              Holland Code
            </p>
            <p className="relative mt-1 font-[family-name:var(--font-display)] text-3xl tracking-tight bg-gradient-to-r from-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
              {scores.riasecCode}
            </p>
          </div>
        </div>
      </section>

      <section className="fade-up surface-report rounded-3xl p-7 md:p-10">
        <article
          className="prose prose-invert max-w-none
            prose-headings:font-[family-name:var(--font-display)]
            prose-headings:tracking-tight
            prose-headings:text-white
            prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:first:mt-0
            prose-p:text-white/75 prose-p:leading-relaxed
            prose-li:text-white/75
            prose-strong:text-white
            prose-ul:my-4"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(report) }}
        />
      </section>

      <section className="fade-up surface-report rounded-3xl p-7">
        <div className="flex items-baseline justify-between mb-5">
          <h3 className="text-[11px] uppercase tracking-[0.28em] text-white/40">
            Careers that fit
          </h3>
          <span className="text-[11px] text-white/30">Live listings via Adzuna</span>
        </div>
        <div className="space-y-3">
          {careers.map((c, i) => (
            <CareerCard key={c.title} career={c} index={i} />
          ))}
        </div>
      </section>

      {onReset && (
        <div className="fade-up text-center pt-4">
          <button
            onClick={confirmReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 text-[11px] uppercase tracking-[0.22em] text-white/50 hover:text-white hover:border-violet-400/40 hover:bg-violet-500/10 transition focus-ring"
          >
            <svg
              className="w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 9-9M3 12l4-4M3 12l4 4" />
            </svg>
            Start over
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------- Share bar ---------- */

function ShareBar({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/ConnexT/r/${slug}`
      : `/ConnexT/r/${slug}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fade-up flex flex-col sm:flex-row items-center justify-center gap-3 py-1">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] pl-4 pr-1.5 py-1.5 max-w-full">
        <svg
          className="w-3.5 h-3.5 text-white/40 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
        <span className="text-xs text-white/60 truncate font-mono">{shareUrl}</span>
        <button
          onClick={copy}
          className="shrink-0 text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90 transition focus-ring"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
      </div>
    </div>
  );
}

/* ---------- Career card ---------- */

type JobListing = {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  description: string;
  salary?: string;
};

function CareerCard({ career, index }: { career: CareerMatch; index: number }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<JobListing[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadJobs() {
    if (jobs) {
      setOpen((o) => !o);
      return;
    }
    setLoading(true);
    setError(null);
    setOpen(true);
    try {
      const res = await fetch(
        `/ConnexT/api/jobs?title=${encodeURIComponent(career.title)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
      setJobs(data.jobs);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load jobs");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fade-up group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-400/30 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-start gap-4 p-5">
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 grid place-items-center font-[family-name:var(--font-display)] text-lg text-white">
            {career.score}
          </div>
          <div className="absolute -inset-1 bg-violet-500/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-[family-name:var(--font-display)] text-xl tracking-tight text-white">
            {career.title}
          </p>
          <p className="text-sm text-white/60 mt-0.5 leading-relaxed">
            {career.blurb}
          </p>
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30 mt-2">
            {career.codes.join(" · ")}
          </p>
        </div>
        <button
          onClick={loadJobs}
          className="shrink-0 text-[11px] uppercase tracking-[0.15em] px-3.5 py-2 rounded-lg border border-white/10 text-white/70 hover:border-violet-400/50 hover:text-white hover:bg-violet-500/10 transition-all focus-ring"
        >
          {open ? "Hide" : "Open roles"}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-black/20 p-4 space-y-2 fade-up">
          {loading && (
            <p className="text-xs text-white/50">Searching live listings…</p>
          )}
          {error && <p className="text-xs text-rose-300/90">{error}</p>}
          {jobs && jobs.length === 0 && (
            <p className="text-xs text-white/50">
              No open listings found right now.
            </p>
          )}
          {jobs?.map((j) => (
            <a
              key={j.id}
              href={j.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-violet-400/30 hover:bg-white/[0.04] transition-all focus-ring"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {j.title}
                  </p>
                  <p className="text-xs text-white/50 truncate mt-0.5">
                    {j.company} · {j.location}
                  </p>
                </div>
                {j.salary && (
                  <span className="text-[11px] font-medium text-violet-200 bg-violet-500/15 border border-violet-400/20 px-2.5 py-1 rounded-md shrink-0">
                    {j.salary}
                  </span>
                )}
              </div>
              <p className="text-xs text-white/50 mt-2 line-clamp-2 leading-relaxed">
                {j.description}
              </p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">{label}</p>
      <div className="mt-2 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="bar-fill h-full bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full"
          style={{ width: `${value}%` }}
        />
      </div>
      <p className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-tight text-white">
        {value}
        <span className="text-sm text-white/30 ml-0.5">/100</span>
      </p>
    </div>
  );
}

/* ---------- Markdown renderer (subset: h2, ul, strong, paragraphs) ---------- */

function renderMarkdown(md: string): string {
  const escape = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const lines = md.split("\n");
  let html = "";
  let inList = false;
  const flushList = () => {
    if (inList) {
      html += "</ul>";
      inList = false;
    }
  };
  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushList();
      html += `<h2>${escape(line.slice(3))}</h2>`;
      continue;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      if (!inList) {
        html += "<ul>";
        inList = true;
      }
      html += `<li>${inline(escape(line.slice(2)))}</li>`;
      continue;
    }
    flushList();
    html += `<p>${inline(escape(line))}</p>`;
  }
  flushList();
  return html;
}

function inline(s: string): string {
  return s.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
}
