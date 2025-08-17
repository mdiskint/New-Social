# New Social — Starter (Next.js + Supabase)

A tiny starter to get you live on Vercel in minutes. Includes:
- Next.js App Router
- Waitlist form (serverless API inserts into Postgres)
- Supabase wired via environment variables
- Minimal styling

## 1) Prereqs
- Vercel account (Personal/Hobby is fine)
- Supabase project (Free plan is fine)

## 2) Environment Variables (Vercel → Project Settings → Environment Variables)
Set these **three** keys in Vercel before deploying:
- `NEXT_PUBLIC_SUPABASE_URL` → from Supabase > Project Settings > API
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` → from Supabase > Project Settings > API
- `SUPABASE_SERVICE_ROLE_KEY` → from Supabase > Project Settings > API (server-side only)

(You can also use a local `.env` file for local dev; see `.env.example`)

## 3) Create the `waitlist` table in Supabase
In Supabase SQL editor, run:
```sql
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamptz not null default now(),
  extra jsonb default '{}'::jsonb
);

-- Row Level Security
alter table public.waitlist enable row level security;

-- Allow inserts via the service role only (safest for MVP). No public insert policy.
-- If you prefer client-side inserts, you'd add a policy like:
-- create policy "allow_insert_emails"
-- on public.waitlist for insert
-- with check (true);
```

## 4) Deploy
- Zip upload this repo to Vercel OR push to GitHub and "Import Project" in Vercel.
- Framework preset: **Next.js**
- Add the env vars from step (2)
- Click **Deploy**

## 5) How it works
- `app/page.tsx` renders a simple waitlist form.
- Submitting the form calls `app/api/join/route.ts` (serverless function).
- The API uses the `SUPABASE_SERVICE_ROLE_KEY` to insert the email into `public.waitlist` securely.

## 6) Local Dev (optional)
```bash
npm install
npm run dev
# open http://localhost:3000
```

## 7) Next Steps
- Customize the landing copy/styling.
- Add email verification if you want (Supabase Auth).
- Build the first protected routes for creators (e.g., /studio).