"use client";

import { useCallback, useEffect, useState } from "react";
import Report from "@/components/Report";
import { QUESTIONS } from "@/lib/assessments/questions";
import type { Response as AssessmentResponse, Scores } from "@/lib/assessments/scoring";
import type { CareerMatch } from "@/lib/careers/match";

type Stage = "intro" | "name" | "assessing" | "loading" | "done";

const LIKERT = [
  { v: 1, label: "Strongly disagree", short: "Disagree" },
  { v: 2, label: "Disagree", short: "Lean no" },
  { v: 3, label: "Neutral", short: "Neutral" },
  { v: 4, label: "Agree", short: "Lean yes" },
  { v: 5, label: "Strongly agree", short: "Agree" },
];

const STORAGE_KEY = "connext:v1";
const STORAGE_VERSION = 1;

type PersistedState = {
  v: number;
  stage: Stage;
  name: string;
  qIndex: number;
  responses: AssessmentResponse[];
  report: string | null;
  scores: Scores | null;
  careers: CareerMatch[] | null;
  slug: string | null;
};

export default function Home() {
  const [stage, setStage] = useState<Stage>("intro");
  const [name, setName] = useState("");
  const [qIndex, setQIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [report, setReport] = useState<string | null>(null);
  const [scores, setScores] = useState<Scores | null>(null);
  const [careers, setCareers] = useState<CareerMatch[] | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const s = JSON.parse(raw) as Partial<PersistedState>;
        if (s.v === STORAGE_VERSION) {
          if (s.stage) setStage(s.stage);
          if (s.name) setName(s.name);
          if (typeof s.qIndex === "number") setQIndex(s.qIndex);
          if (Array.isArray(s.responses)) setResponses(s.responses);
          if (typeof s.report === "string") setReport(s.report);
          if (s.scores) setScores(s.scores);
          if (Array.isArray(s.careers)) setCareers(s.careers);
          if (typeof s.slug === "string") setSlug(s.slug);
        }
      }
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  // Persist on every meaningful change, but only after hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      const payload: PersistedState = {
        v: STORAGE_VERSION,
        stage,
        name,
        qIndex,
        responses,
        report,
        scores,
        careers,
        slug,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // storage might be full or disabled; non-fatal
    }
  }, [hydrated, stage, name, qIndex, responses, report, scores, careers, slug]);

  const begin = () => setStage("name");

  const resetAll = () => {
    setStage("intro");
    setName("");
    setQIndex(0);
    setResponses([]);
    setReport(null);
    setScores(null);
    setCareers(null);
    setSlug(null);
    setError(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const submitName = (n: string) => {
    const t = n.trim();
    if (!t) return;
    setName(t);
    setStage("assessing");
    setQIndex(0);
    setResponses([]);
  };

  const answer = useCallback(
    (value: number) => {
      if (stage !== "assessing") return;
      const q = QUESTIONS[qIndex];
      const next = qIndex + 1;
      // Replace the response at qIndex (supports going back + re-answering)
      const newResponses = [...responses];
      newResponses[qIndex] = { id: q.id, value };
      setResponses(newResponses);
      setDirection("forward");

      if (next >= QUESTIONS.length) {
        setStage("loading");
        void generateReport(newResponses);
      } else {
        setQIndex(next);
      }
    },
    [qIndex, responses, stage]
  );

  const goBack = useCallback(() => {
    if (stage !== "assessing" || qIndex === 0) return;
    setDirection("back");
    setQIndex((i) => i - 1);
  }, [qIndex, stage]);

  // Skip forward: allowed when the next slot is one you've already visited
  // (either answered, or the current "unanswered" slot you came from via Back).
  const canSkipForward =
    stage === "assessing" &&
    qIndex + 1 < QUESTIONS.length &&
    qIndex + 1 <= responses.length;
  const goForward = useCallback(() => {
    if (!canSkipForward) return;
    setDirection("forward");
    setQIndex((i) => i + 1);
  }, [canSkipForward]);

  async function generateReport(resp: AssessmentResponse[]) {
    try {
      const res = await fetch("/ConnexT/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, responses: resp }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setReport(data.report);
      setScores(data.scores);
      setCareers(data.careers);
      setSlug(data.slug ?? null);
      setStage("done");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStage("assessing");
    }
  }

  // Keyboard shortcuts while answering
  useEffect(() => {
    if (stage !== "assessing") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= "1" && e.key <= "5") {
        e.preventDefault();
        answer(Number(e.key));
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        goBack();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goForward();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, answer, goBack, goForward]);

  const progress =
    stage === "assessing" || stage === "loading"
      ? Math.round((responses.length / QUESTIONS.length) * 100)
      : stage === "done"
      ? 100
      : 0;

  return (
    <main className="relative z-10 min-h-screen text-[#f5f5f7] flex flex-col">
      {/* Masthead */}
      <div className="max-w-4xl w-full mx-auto px-6 pt-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Monogram />
            <span className="font-[family-name:var(--font-display)] text-[22px] tracking-tight leading-none">
              ConnexT
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/35">
            <span className="h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
            by AI Esquire
          </div>
        </div>
        <div className="hairline h-px w-full mt-5" />
      </div>

      {/* Main canvas */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl">
          {stage === "intro" && <IntroView onBegin={begin} />}
          {stage === "name" && <NameView onSubmit={submitName} />}
          {stage === "assessing" && (
            <QuestionView
              index={qIndex}
              total={QUESTIONS.length}
              prompt={QUESTIONS[qIndex].prompt}
              selected={responses[qIndex]?.value}
              direction={direction}
              onAnswer={answer}
              onBack={qIndex > 0 ? goBack : undefined}
              onForward={canSkipForward ? goForward : undefined}
            />
          )}
          {stage === "loading" && <LoadingView name={name} />}
          {stage === "done" && report && scores && careers && (
            <Report
              report={report}
              scores={scores}
              careers={careers}
              slug={slug}
              onReset={resetAll}
            />
          )}
          {error && (
            <p className="mt-6 text-sm text-rose-300/90 text-center">
              Something went wrong: {error}
            </p>
          )}
        </div>
      </div>

      {/* Progress rail — fixed to bottom of viewport while assessing */}
      {(stage === "assessing" || stage === "loading") && (
        <div className="sticky bottom-0 z-20 bg-gradient-to-t from-[#030306] via-[#030306]/95 to-transparent pb-6 pt-10">
          <div className="max-w-3xl mx-auto px-6">
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/40 tabular-nums shrink-0">
                {String(responses.length).padStart(2, "0")}
                <span className="text-white/20"> / {QUESTIONS.length}</span>
              </span>
              <div className="relative h-[2px] flex-1 rounded-full bg-white/[0.08] overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 transition-all duration-700 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[10px] uppercase tracking-[0.22em] text-white/40 tabular-nums shrink-0">
                {progress}%
              </span>
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 py-10 text-center">
        <div className="max-w-3xl mx-auto px-6">
          <div className="hairline h-px w-full mb-6" />
          <p className="text-[10px] uppercase tracking-[0.22em] text-white/30">
            ConnexT · An AI Esquire production
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ---------- Views ---------- */

function IntroView({ onBegin }: { onBegin: () => void }) {
  return (
    <div className="fade-up text-center">
      <p className="text-[11px] uppercase tracking-[0.28em] text-white/40 mb-6">
        A conversation about who you are
      </p>
      <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight">
        Find the work
        <br />
        <span className="italic bg-gradient-to-r from-violet-300 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
          that fits who you are.
        </span>
      </h1>
      <p className="mt-8 text-white/55 max-w-xl mx-auto text-[16px] leading-relaxed">
        A thoughtful assessment grounded in the Big Five and Holland Code
        frameworks. Personal, specific, and built for humans — not algorithms.
      </p>
      <div className="mt-12 flex items-center justify-center gap-6">
        <button
          onClick={onBegin}
          className="group relative px-8 py-4 rounded-full font-medium overflow-hidden focus-ring"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
          <span className="absolute inset-0 bg-gradient-to-r from-violet-400 to-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="absolute -inset-4 bg-violet-500/30 blur-2xl -z-10 opacity-60 halo" />
          <span className="relative flex items-center gap-2.5 text-white">
            Begin
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </button>
        <div className="hidden sm:flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/30">
          <kbd className="px-2 py-1 rounded border border-white/10 bg-white/[0.03] text-white/50">
            Enter
          </kbd>
          to begin
        </div>
      </div>
    </div>
  );
}

function NameView({ onSubmit }: { onSubmit: (n: string) => void }) {
  const [value, setValue] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(value);
      }}
      className="fade-up text-center"
    >
      <p className="text-[11px] uppercase tracking-[0.28em] text-white/40 mb-6">
        First, a small formality
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-5xl md:text-6xl leading-[1.05] tracking-tight">
        What should we <span className="italic">call you?</span>
      </h2>
      <div className="mt-12 max-w-md mx-auto">
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Your name"
          className="w-full text-center text-2xl font-[family-name:var(--font-display)] bg-transparent border-b border-white/15 focus:border-violet-400 pb-3 focus:outline-none placeholder-white/20 transition-colors"
        />
        <p className="mt-6 text-[11px] uppercase tracking-[0.22em] text-white/30">
          Press{" "}
          <kbd className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/50 tracking-normal">
            Enter
          </kbd>{" "}
          to continue
        </p>
      </div>
    </form>
  );
}

function QuestionView({
  index,
  total,
  prompt,
  selected,
  direction,
  onAnswer,
  onBack,
  onForward,
}: {
  index: number;
  total: number;
  prompt: string;
  selected?: number;
  direction: "forward" | "back";
  onAnswer: (v: number) => void;
  onBack?: () => void;
  onForward?: () => void;
}) {
  const animClass = direction === "forward" ? "slide-in-right" : "slide-in-left";

  return (
    <div key={index} className={`${animClass} text-center`}>
      {/* Nav row: back · number · forward */}
      <div className="mb-6 flex items-center justify-center gap-4">
        <NavChip
          direction="back"
          label="Back"
          onClick={onBack}
          disabled={!onBack}
        />
        <span className="font-[family-name:var(--font-display)] text-white/40 text-lg tracking-tight tabular-nums select-none">
          {String(index + 1).padStart(2, "0")}{" "}
          <span className="text-white/20">
            — {String(total).padStart(2, "0")}
          </span>
        </span>
        <NavChip
          direction="forward"
          label="Forward"
          onClick={onForward}
          disabled={!onForward}
        />
      </div>

      {/* The prompt */}
      <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight text-white max-w-3xl mx-auto">
        &ldquo;{prompt}&rdquo;
      </h2>

      {/* Answer options */}
      <div className="mt-14 space-y-2.5 max-w-md mx-auto">
        {LIKERT.map((l, i) => {
          const isSelected = selected === l.v;
          return (
            <button
              key={l.v}
              onClick={() => onAnswer(l.v)}
              className={`group w-full rounded-xl px-5 py-4 transition-all duration-300 focus-ring border ${
                isSelected
                  ? "border-violet-400/60 bg-violet-500/10 shadow-[0_0_0_1px_rgba(167,139,250,0.3),0_20px_60px_-20px_rgba(167,139,250,0.4)]"
                  : "border-white/[0.08] bg-white/[0.015] hover:border-violet-400/40 hover:bg-violet-500/[0.04]"
              }`}
              style={{
                animationDelay: `${150 + i * 60}ms`,
                animationFillMode: "both",
              }}
            >
              <div className="flex items-center justify-center gap-4">
                <span
                  className={`shrink-0 w-8 h-8 rounded-md border grid place-items-center text-[11px] font-medium tabular-nums transition ${
                    isSelected
                      ? "border-violet-400/60 bg-violet-500/20 text-white"
                      : "border-white/10 bg-white/[0.02] text-white/40 group-hover:border-violet-400/30 group-hover:text-violet-300"
                  }`}
                >
                  {l.v}
                </span>
                <span
                  className={`font-[family-name:var(--font-display)] text-xl md:text-2xl tracking-tight transition ${
                    isSelected ? "text-white" : "text-white/70 group-hover:text-white"
                  }`}
                >
                  {l.label}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Keyboard hint */}
      <p className="mt-10 text-[10px] uppercase tracking-[0.22em] text-white/25">
        <kbd className="mx-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/50 tracking-normal">
          1
        </kbd>
        –
        <kbd className="mx-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/50 tracking-normal">
          5
        </kbd>{" "}
        to answer
        {onBack && (
          <>
            {" "}
            ·{" "}
            <kbd className="mx-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/50 tracking-normal">
              ←
            </kbd>{" "}
            back
          </>
        )}
        {onForward && (
          <>
            {" "}
            ·{" "}
            <kbd className="mx-0.5 px-1.5 py-0.5 rounded border border-white/10 bg-white/[0.03] text-white/50 tracking-normal">
              →
            </kbd>{" "}
            forward
          </>
        )}
      </p>
    </div>
  );
}

function NavChip({
  direction,
  label,
  onClick,
  disabled,
}: {
  direction: "back" | "forward";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const isBack = direction === "back";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-[0.18em] transition focus-ring ${
        disabled
          ? "border-white/[0.04] text-white/15 cursor-not-allowed"
          : "border-white/10 text-white/55 hover:text-white hover:border-violet-400/50 hover:bg-violet-500/10"
      }`}
    >
      {isBack && (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      )}
      {label}
      {!isBack && (
        <svg
          className="w-3 h-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
}

function LoadingView({ name }: { name: string }) {
  return (
    <div className="fade-up text-center">
      <div className="relative inline-block mb-8 drift">
        <div className="w-16 h-16 rounded-full border border-white/10 grid place-items-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400" />
        </div>
        <div className="absolute inset-0 rounded-full bg-violet-500/30 blur-xl halo -z-10" />
      </div>
      <p className="text-[11px] uppercase tracking-[0.28em] text-white/40 mb-4">
        Composing your report
      </p>
      <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl leading-[1.05] tracking-tight">
        Reading between
        <br />
        <span className="italic text-white/70">the lines{name ? `, ${name}` : ""}…</span>
      </h2>
      <p className="mt-8 text-white/40 text-sm">
        This usually takes about ten seconds.
      </p>
    </div>
  );
}

function Monogram() {
  return (
    <div className="relative h-10 w-10 rounded-xl overflow-hidden ring-1 ring-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-violet-600" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <span className="absolute inset-0 grid place-items-center font-[family-name:var(--font-display)] text-xl text-white leading-none italic">
        C
      </span>
      <div className="absolute -inset-2 bg-violet-500/30 blur-xl -z-10" />
    </div>
  );
}

