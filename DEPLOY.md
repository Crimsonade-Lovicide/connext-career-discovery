# Deploying ConnexT

ConnexT is a Next.js 16 app configured with `basePath: "/ConnexT"` so it mounts cleanly under `aiesquire.io/ConnexT`.

## Environment variables

Set these on Vercel (Project → Settings → Environment Variables) and in a local `.env.local` for development:

| Variable | Required | Where to get it |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | yes | https://console.anthropic.com/settings/keys |
| `ADZUNA_APP_ID` | optional (jobs) | https://developer.adzuna.com/ |
| `ADZUNA_APP_KEY` | optional (jobs) | https://developer.adzuna.com/ |
| `SUPABASE_URL` | optional (shareable links) | Supabase project → Settings → API |
| `SUPABASE_ANON_KEY` | optional (shareable links) | Supabase project → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | optional (shareable links) | Supabase project → Settings → API |

If Adzuna keys are missing, the report still works — clicking "See open jobs" will just show an error for that career. If the Supabase keys are missing, reports simply aren't persisted and the Share bar is hidden. The core chat → personality + career report flow only needs the Anthropic key.

**Protect your spend**: go to Anthropic Console → Settings → Limits and set a monthly cap before launching publicly.

## Option A — deploy as its own Vercel project, then proxy from aiesquire.io (recommended)

This is the cleanest approach if your main site already exists on a different stack.

1. From inside `connext/`, run `npx vercel` and let the CLI create a new project (name it `connext`).
2. In the Vercel dashboard, add the environment variables above and redeploy.
3. Note the deployment URL (e.g. `connext.vercel.app`).
4. On your main `aiesquire.io` site, add a rewrite so that all `/ConnexT/*` requests are forwarded to the Vercel deployment. Examples:

   **If aiesquire.io is also on Vercel**, add this to its `vercel.json`:

   ```json
   {
     "rewrites": [
       { "source": "/ConnexT", "destination": "https://connext.vercel.app/ConnexT" },
       { "source": "/ConnexT/:path*", "destination": "https://connext.vercel.app/ConnexT/:path*" }
     ]
   }
   ```

   **If aiesquire.io is on Cloudflare**, create a Worker or a Bulk Redirect / Page Rule pointing `aiesquire.io/ConnexT/*` to the Vercel URL as a proxy (not a redirect).

   **If aiesquire.io is on Nginx**, add:

   ```
   location /ConnexT/ {
       proxy_pass https://connext.vercel.app/ConnexT/;
       proxy_set_header Host connext.vercel.app;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }
   ```

Because `basePath` is set, all asset and API URLs are already prefixed with `/ConnexT`, so proxying works without rewriting any paths.

## Option B — merge ConnexT into your aiesquire.io codebase

If aiesquire.io is itself a Next.js app, you can copy `src/lib/`, `src/app/api/`, and the ConnexT page into a subroute of the main app instead. Remove `basePath` from `next.config.ts` in that case and mount the page at `/ConnexT` via the file system (e.g. `src/app/ConnexT/page.tsx`). This avoids the extra hop but couples the deployments.

## Local development

```bash
cd connext
cp .env.local.example .env.local   # then fill in the keys
npm install
npm run dev
# open http://localhost:3000/ConnexT
```

## Things to know about rate limiting

`src/lib/rateLimit.ts` is an in-memory best-effort limiter. On Vercel's serverless runtime it limits per lambda instance, not globally. That's enough to cap worst-case abuse from a cold instance, but if the tool gets popular you'll want to upgrade to Upstash Redis or Vercel KV for a true global limit. The current caps:

- `/api/report`: 5 requests per IP per hour
- `/api/jobs`: 30 requests per IP per hour

## Supabase setup (shareable report links)

ConnexT can persist each generated report to a Supabase `reports` table and expose it at a public, unguessable slug URL like `aiesquire.io/ConnexT/r/ab3k9xmp2q`. Reports are still kept in the visitor's `localStorage` for the automatic "return to your report" experience — Supabase is only for the share link.

1. **Create a project** at https://supabase.com. The free tier is plenty.
2. **Run the migration.** Open Project → SQL Editor and paste the contents of [`supabase/migrations/0001_reports.sql`](supabase/migrations/0001_reports.sql), then Run. This creates the `reports` table, indexes, and a Row Level Security policy that allows public reads of any row (the slug itself is the access token) while blocking all client-side writes.
3. **Copy your keys** from Project → Settings → API:
   - `Project URL` → `SUPABASE_URL`
   - `anon public` key → `SUPABASE_ANON_KEY` (used for public reads)
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (used server-side to insert new reports; **never** ship this to the client)
4. **Add them to Vercel** (Project → Settings → Environment Variables) and redeploy.

That's it. The app detects Supabase at runtime — if the three variables are present, `/api/report` writes each new report and returns a `slug`, and the Share bar appears at the top of the report view. Missing variables are a graceful no-op.

Security notes:
- Slugs are 10 characters from a 31-letter alphabet (~48 bits of entropy), so they are unguessable in practice. Treat the slug like an unlisted-but-public URL.
- The anon read policy is `using (true)` — anyone with a slug can read the row. There is no user auth.
- No insert/update/delete policy exists for `anon` or `authenticated`, so the public API surface is read-only.

## What's not (yet) in the box

- Analytics: add `@vercel/analytics` or Plausible if you want traffic data.
- Social share card: swap in a custom `opengraph-image.tsx` route for prettier link previews.
- User accounts: Supabase is used as a pure key-value store today; there is no login. If you add auth later you can migrate the RLS policies to key off `auth.uid()`.
