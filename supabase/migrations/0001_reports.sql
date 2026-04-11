-- ConnexT reports table
-- Stores generated personality + career reports keyed by a short public slug.

create extension if not exists "pgcrypto";

create table if not exists public.reports (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null default '',
  responses jsonb not null,
  scores jsonb not null,
  careers jsonb not null,
  report text not null,
  created_at timestamptz not null default now()
);

create index if not exists reports_slug_idx on public.reports (slug);
create index if not exists reports_created_at_idx on public.reports (created_at desc);

-- Row Level Security
alter table public.reports enable row level security;

-- Anyone can read a report if they know the slug (the slug is the access token).
drop policy if exists "public read reports" on public.reports;
create policy "public read reports"
  on public.reports
  for select
  to anon, authenticated
  using (true);

-- Inserts are done server-side with the service_role key, which bypasses RLS.
-- No insert policy for anon/authenticated so nothing can write directly from the client.
