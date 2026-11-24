-- Lunary ID profiles table and row-level security
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  lunary_id text not null unique,
  username text not null default 'Lunarian',
  avatar_color text not null default 'green' check (avatar_color in ('green','violet','pink','orange')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
drop policy if exists "Users can read own profile" on public.profiles;
create policy "Users can read own profile" on public.profiles for select to authenticated using (auth.uid() = id);
drop policy if exists "Users can insert own profile" on public.profiles;
create policy "Users can insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);
create index if not exists profiles_lunary_id_idx on public.profiles(lunary_id);
