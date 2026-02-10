-- Tables
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  icon text,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.dishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null,
  price numeric not null check (price >= 0),
  category_id uuid references public.categories(id) on delete set null,
  image_url text,
  available boolean not null default true,
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;$$ language plpgsql;

drop trigger if exists dishes_updated_at on public.dishes;
create trigger dishes_updated_at before update on public.dishes for each row execute procedure public.set_updated_at();

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.business_hours (
  id uuid primary key default gen_random_uuid(),
  day_of_week int not null check (day_of_week between 0 and 6),
  open_time text,
  close_time text,
  is_closed boolean not null default false
);

-- RLS
alter table public.categories enable row level security;
alter table public.dishes enable row level security;
alter table public.site_settings enable row level security;
alter table public.business_hours enable row level security;

-- Policies: public read
create policy "Public read categories" on public.categories for select using (true);
create policy "Public read dishes" on public.dishes for select using (true);
create policy "Public read settings" on public.site_settings for select using (true);
create policy "Public read hours" on public.business_hours for select using (true);

-- Policies: authenticated write
create policy "Auth write categories" on public.categories for insert with check (auth.uid() is not null);
create policy "Auth update categories" on public.categories for update using (auth.uid() is not null);
create policy "Auth delete categories" on public.categories for delete using (auth.uid() is not null);

create policy "Auth write dishes" on public.dishes for insert with check (auth.uid() is not null);
create policy "Auth update dishes" on public.dishes for update using (auth.uid() is not null);
create policy "Auth delete dishes" on public.dishes for delete using (auth.uid() is not null);

create policy "Auth write settings" on public.site_settings for insert with check (auth.uid() is not null);
create policy "Auth update settings" on public.site_settings for update using (auth.uid() is not null);
create policy "Auth delete settings" on public.site_settings for delete using (auth.uid() is not null);

create policy "Auth write hours" on public.business_hours for insert with check (auth.uid() is not null);
create policy "Auth update hours" on public.business_hours for update using (auth.uid() is not null);
create policy "Auth delete hours" on public.business_hours for delete using (auth.uid() is not null);

-- Storage buckets
insert into storage.buckets (id, name, public) values ('dish-images', 'dish-images', true)
on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true)
on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('assets', 'assets', true)
on conflict (id) do nothing;

-- Storage policies: public read, auth write
create policy "Public read dish-images" on storage.objects for select using (bucket_id = 'dish-images');
create policy "Public read gallery" on storage.objects for select using (bucket_id = 'gallery');
create policy "Public read assets" on storage.objects for select using (bucket_id = 'assets');

create policy "Auth write dish-images" on storage.objects for insert with check (auth.uid() is not null and bucket_id = 'dish-images');
create policy "Auth write gallery" on storage.objects for insert with check (auth.uid() is not null and bucket_id = 'gallery');
create policy "Auth write assets" on storage.objects for insert with check (auth.uid() is not null and bucket_id = 'assets');

create policy "Auth delete dish-images" on storage.objects for delete using (auth.uid() is not null and bucket_id = 'dish-images');
create policy "Auth delete gallery" on storage.objects for delete using (auth.uid() is not null and bucket_id = 'gallery');
create policy "Auth delete assets" on storage.objects for delete using (auth.uid() is not null and bucket_id = 'assets');