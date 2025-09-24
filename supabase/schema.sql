-- Supabase schema for GalaLMS MVP
create type role as enum ('trainee', 'mentor', 'admin');

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role role not null default 'trainee',
  store_id text,
  created_at timestamptz default now()
);

grant usage on type role to public;

grant select, insert, update on public.profiles to authenticated;

create table if not exists public.tracks (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.days (
  id uuid primary key default gen_random_uuid(),
  track_id uuid references public.tracks(id) on delete cascade,
  day_index int not null check (day_index between 1 and 6),
  title text not null,
  focus text,
  created_at timestamptz default now()
);

create type lesson_type as enum ('video', 'quiz', 'roleplay', 'checklist', 'sku');

grant usage on type lesson_type to public;

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  day_id uuid references public.days(id) on delete cascade,
  type lesson_type not null,
  title text not null,
  summary text,
  payload jsonb not null,
  order_index int not null,
  duration_minutes int default 5,
  created_at timestamptz default now()
);

create table if not exists public.attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  lesson_id uuid references public.lessons(id) on delete cascade,
  status text check (status in ('started','passed','failed')) not null,
  score int,
  max_score int,
  feedback text,
  retry_after timestamptz,
  created_at timestamptz default now()
);

create table if not exists public.sku (
  id text primary key,
  title text not null,
  usp text[],
  allergens text[],
  cross_sell text[],
  promo jsonb,
  created_at timestamptz default now()
);

create table if not exists public.store_scores (
  id uuid primary key default gen_random_uuid(),
  store_id text not null,
  track_id uuid references public.tracks(id) on delete cascade,
  readiness_index numeric(5,2) not null,
  updated_at timestamptz default now()
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  event_type text not null,
  payload jsonb,
  created_at timestamptz default now()
);

alter table public.tracks enable row level security;
alter table public.days enable row level security;
alter table public.lessons enable row level security;
alter table public.attempts enable row level security;
alter table public.sku enable row level security;
alter table public.store_scores enable row level security;
alter table public.events enable row level security;

create policy "own profile" on public.profiles for all using (auth.uid() = id);
create policy "trainee track access" on public.tracks for select using (true);
create policy "trainee day access" on public.days for select using (true);
create policy "trainee lesson access" on public.lessons for select using (true);
create policy "manage own attempts" on public.attempts for select using (auth.uid() = user_id);
create policy "insert own attempts" on public.attempts for insert with check (auth.uid() = user_id);
create policy "mentor sku access" on public.sku for select using (true);
create policy "mentor store scores" on public.store_scores for select using (true);
create policy "events ownership" on public.events for all using (auth.uid() = user_id);
