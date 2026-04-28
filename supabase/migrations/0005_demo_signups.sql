-- 0005_demo_signups.sql
-- Lead capture table for the Always On Front Desk demo email gate.
-- One row per email-trade pair (no dedupe — multiple visits = multiple rows so we can see engagement).

create table if not exists public.demo_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  trade text not null check (trade in ('plumber','electrician','builder','real-estate','other')),
  business_name text,
  ref_url text,
  user_agent text,
  ip text,
  created_at timestamptz not null default now()
);

create index if not exists demo_signups_email_idx on public.demo_signups (email);
create index if not exists demo_signups_created_idx on public.demo_signups (created_at desc);
create index if not exists demo_signups_trade_idx on public.demo_signups (trade);

-- Lock down the table: service role inserts (from API), anon has nothing.
alter table public.demo_signups enable row level security;
-- No policies = no access for anon/authenticated; service role bypasses RLS.
