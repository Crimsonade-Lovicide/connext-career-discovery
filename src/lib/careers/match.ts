import { CAREERS, type Career } from "./database";
import type { RIASEC } from "../assessments/questions";
import type { Scores } from "../assessments/scoring";

// Score each career by weighted overlap with the user's RIASEC profile.
// Primary code letter worth 3, secondary 2, tertiary 1.

export type CareerMatch = Career & { score: number };

export function matchCareers(scores: Scores, limit = 8): CareerMatch[] {
  const weights = scores.riasec; // 0-100 per letter

  const ranked: CareerMatch[] = CAREERS.map((c) => {
    const [p, s, t] = c.codes;
    const score =
      (weights[p as RIASEC] ?? 0) * 3 +
      (weights[s as RIASEC] ?? 0) * 2 +
      (weights[t as RIASEC] ?? 0) * 1;
    return { ...c, score };
  }).sort((a, b) => b.score - a.score);

  // Normalize top score to 100 for display
  const top = ranked[0]?.score || 1;
  return ranked.slice(0, limit).map((c) => ({
    ...c,
    score: Math.round((c.score / top) * 100),
  }));
}
