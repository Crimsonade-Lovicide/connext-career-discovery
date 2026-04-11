// Best-effort in-memory rate limiter.
//
// IMPORTANT: On Vercel serverless, each lambda instance has its own memory,
// so this limits *per instance* not globally. It will still cap the worst
// case from a single cold instance. For a truly global limit, swap this out
// for Upstash Redis or Vercel KV.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type RateLimitResult =
  | { ok: true; remaining: number }
  | { ok: false; retryAfterSec: number };

export function rateLimit(
  key: string,
  max: number,
  windowMs: number
): RateLimitResult {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now >= b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1 };
  }
  if (b.count >= max) {
    return { ok: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true, remaining: max - b.count };
}

export function getClientKey(request: Request): string {
  // Prefer the forwarded IP headers Vercel sets; fall back to a constant.
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}
