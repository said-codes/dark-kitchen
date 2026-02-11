
-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Tables
create table if not exists categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Migration for existing tables using "order"
do $$
begin
  if exists(select 1 from information_schema.columns where table_name = 'categories' and column_name = 'order') then
    alter table categories rename column "order" to sort_order;
  end if;
end $$;

create table if not exists dishes (
  id uuid default gen_random_uuid() primary key,
  category_id uuid references categories(id),
  name text not null,
  description text,
  price decimal not null,
  image_url text,
  available boolean default true,
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- Migration for dishes
do $$
begin
  if exists(select 1 from information_schema.columns where table_name = 'dishes' and column_name = 'order') then
    alter table dishes rename column "order" to sort_order;
  end if;
end $$;

create table if not exists gallery_items (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price decimal,
  image_url text not null,
  created_at timestamptz default now()
);

create table if not exists site_settings (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);

-- Storage buckets
insert into storage.buckets (id, name, public) values ('menu', 'menu', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('assets', 'assets', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('gallery', 'gallery', true) on conflict do nothing;
insert into storage.buckets (id, name, public) values ('dish-images', 'dish-images', true) on conflict do nothing;

-- RLS Enablement
alter table categories enable row level security;
alter table dishes enable row level security;
alter table gallery_items enable row level security;
alter table site_settings enable row level security;

-- Policies

-- Categories
drop policy if exists "Public read categories" on categories;
create policy "Public read categories" on categories for select using (true);

drop policy if exists "Admin all categories" on categories;
create policy "Admin all categories" on categories for all using (auth.role() = 'authenticated');

-- Dishes
drop policy if exists "Public read dishes" on dishes;
create policy "Public read dishes" on dishes for select using (true);

drop policy if exists "Admin all dishes" on dishes;
create policy "Admin all dishes" on dishes for all using (auth.role() = 'authenticated');

-- Gallery Items
drop policy if exists "Public read gallery_items" on gallery_items;
create policy "Public read gallery_items" on gallery_items for select using (true);

drop policy if exists "Admin all gallery_items" on gallery_items;
create policy "Admin all gallery_items" on gallery_items for all using (auth.role() = 'authenticated');

-- Site Settings
drop policy if exists "Public read settings" on site_settings;
create policy "Public read settings" on site_settings for select using (true);

drop policy if exists "Admin all settings" on site_settings;
create policy "Admin all settings" on site_settings for all using (auth.role() = 'authenticated');

-- Storage Policies
-- Generic helper for all buckets used (simplifying for user)
create policy "Public Access" on storage.objects for select using ( bucket_id in ('menu', 'assets', 'gallery', 'dish-images') );
create policy "Admin Insert" on storage.objects for insert with check ( auth.role() = 'authenticated' );
create policy "Admin Update" on storage.objects for update using ( auth.role() = 'authenticated' );
create policy "Admin Delete" on storage.objects for delete using ( auth.role() = 'authenticated' );
