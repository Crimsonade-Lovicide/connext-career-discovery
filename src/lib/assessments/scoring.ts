import { QUESTIONS, type RIASEC, type Trait } from "./questions";

export type Response = { id: string; value: number }; // 1..5

export type BigFiveScores = {
  O: number; // 0-100
  C: number;
  E: number;
  A: number;
  N: number;
  steadiness: number; // 100 - N, shown to user
};

export type RiasecScores = Record<RIASEC, number>; // 0-100 each

export type Scores = {
  bigFive: BigFiveScores;
  riasec: RiasecScores;
  riasecCode: string; // top 3 letters, e.g. "IAS"
};

function normalize(avg: number): number {
  // Likert 1..5 → 0..100
  return Math.round(((avg - 1) / 4) * 100);
}

export function scoreAll(responses: Response[]): Scores {
  const byId = new Map(responses.map((r) => [r.id, r.value]));

  const traitSum: Record<Trait, { sum: number; n: number }> = {
    O: { sum: 0, n: 0 }, C: { sum: 0, n: 0 }, E: { sum: 0, n: 0 },
    A: { sum: 0, n: 0 }, N: { sum: 0, n: 0 },
  };
  const riasecSum: Record<RIASEC, { sum: number; n: number }> = {
    R: { sum: 0, n: 0 }, I: { sum: 0, n: 0 }, A: { sum: 0, n: 0 },
    S: { sum: 0, n: 0 }, E: { sum: 0, n: 0 }, C: { sum: 0, n: 0 },
  };

  for (const q of QUESTIONS) {
    const raw = byId.get(q.id);
    if (raw == null) continue;
    if (q.kind === "bigfive") {
      const v = q.reversed ? 6 - raw : raw;
      traitSum[q.trait].sum += v;
      traitSum[q.trait].n += 1;
    } else {
      riasecSum[q.code].sum += raw;
      riasecSum[q.code].n += 1;
    }
  }

  const avg = (x: { sum: number; n: number }) => (x.n ? x.sum / x.n : 3);

  const bigFive: BigFiveScores = {
    O: normalize(avg(traitSum.O)),
    C: normalize(avg(traitSum.C)),
    E: normalize(avg(traitSum.E)),
    A: normalize(avg(traitSum.A)),
    N: normalize(avg(traitSum.N)),
    steadiness: 0,
  };
  bigFive.steadiness = 100 - bigFive.N;

  const riasec: RiasecScores = {
    R: normalize(avg(riasecSum.R)),
    I: normalize(avg(riasecSum.I)),
    A: normalize(avg(riasecSum.A)),
    S: normalize(avg(riasecSum.S)),
    E: normalize(avg(riasecSum.E)),
    C: normalize(avg(riasecSum.C)),
  };

  const riasecCode = (Object.entries(riasec) as [RIASEC, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([k]) => k)
    .join("");

  return { bigFive, riasec, riasecCode };
}
