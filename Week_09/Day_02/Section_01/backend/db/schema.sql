-- Run this in the Supabase SQL Editor after creating a project.
-- Auth users live in auth.users (managed by Supabase Auth).

create table if not exists public.pokemon (
  pokeapi_id int primary key,
  name text not null,
  sprite_url text,
  types jsonb not null default '[]'::jsonb,
  stats jsonb not null default '{}'::jsonb,
  moves jsonb not null default '[]'::jsonb
);

create table if not exists public.user_pokemon (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  pokeapi_id int not null references public.pokemon (pokeapi_id) on delete cascade,
  nickname text,
  current_location text not null check (current_location in ('team', 'box')),
  team_slot int check (team_slot is null or (team_slot >= 1 and team_slot <= 6)),
  caught_at timestamptz not null default now(),
  learned_moves jsonb not null default '[]'::jsonb,
  encounter_zone text,
  stats_snapshot jsonb not null default '{}'::jsonb
);

create unique index if not exists user_pokemon_team_slot_unique
  on public.user_pokemon (user_id, team_slot)
  where current_location = 'team' and team_slot is not null;

create index if not exists user_pokemon_user_location_idx
  on public.user_pokemon (user_id, current_location);

create table if not exists public.catch_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  pokeapi_id int not null,
  zone text,
  caught_at timestamptz not null default now(),
  action text not null default 'caught'
);

create index if not exists catch_history_user_idx on public.catch_history (user_id, caught_at desc);

alter table public.pokemon enable row level security;
alter table public.user_pokemon enable row level security;
alter table public.catch_history enable row level security;

-- No anon policies: the Express API uses the service role key and enforces user_id from the JWT.
