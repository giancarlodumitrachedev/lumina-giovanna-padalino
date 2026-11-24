-- ==============================================================================
-- Lumina - Dott.ssa Giovanna Padalino: Strumenti & Schede Scaricabili + Tracking
-- ==============================================================================

-- 1. Tabella Strumenti Clinici & Pedagogici (PDF e Immagini)
create table if not exists public.resources (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text not null,
  category text not null check (category in (
    'ADHD e neurodivergenze',
    'Adolescenti e giovani adulti',
    'Genitorialità e scuola',
    'Ansia, autostima e relazioni',
    'Psicologia e benessere'
  )),
  file_url text not null,
  file_name text not null,
  file_type text not null check (file_type in ('pdf', 'image')),
  mime_type text not null default 'application/pdf',
  file_size_bytes integer default 0,
  preview_image_url text,
  target_audience text default 'Colleghi, genitori, insegnanti e uso personale',
  is_published boolean default true,
  download_count integer default 0,
  sort_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

create index if not exists idx_resources_published
  on public.resources (is_published, sort_order asc, created_at desc);

create index if not exists idx_resources_slug
  on public.resources (slug);

-- 2. Tabella Registro Download (strettamente privata: visibile solo in /admin)
create table if not exists public.resource_downloads (
  id uuid default gen_random_uuid() primary key,
  resource_id uuid not null references public.resources(id) on delete cascade,
  downloader_role text not null check (downloader_role in (
    'collega',
    'insegnante',
    'genitore',
    'personale',
    'altro'
  )),
  downloader_email text,
  marketing_consent boolean default false,
  source_type text not null default 'blog_catalog' check (source_type in ('blog_catalog', 'blog_article')),
  source_post_slug text,
  referrer text,
  device_type text check (device_type in ('mobile', 'tablet', 'desktop')),
  city text,
  country text,
  created_at timestamp with time zone default now()
);

create index if not exists idx_downloads_resource_created
  on public.resource_downloads (resource_id, created_at desc);

create index if not exists idx_downloads_created
  on public.resource_downloads (created_at desc);

create index if not exists idx_downloads_role
  on public.resource_downloads (downloader_role);

-- 3. Collegamento opzionale da Articolo del Blog -> Strumento Scaricabile
alter table public.posts
  add column if not exists attached_resource_id uuid references public.resources(id) on delete set null;

create index if not exists idx_posts_attached_resource
  on public.posts (attached_resource_id);

-- 4. Row Level Security (RLS)
alter table public.resources enable row level security;
alter table public.resource_downloads enable row level security;

-- Resources: lettura pubblica solo per strumenti pubblicati
drop policy if exists "Lettura pubblica strumenti pubblicati" on public.resources;
create policy "Lettura pubblica strumenti pubblicati"
  on public.resources for select
  using (is_published = true);

drop policy if exists "Gestione strumenti per utenti autenticati" on public.resources;
create policy "Gestione strumenti per utenti autenticati"
  on public.resources for all
  using (auth.role() = 'authenticated');

drop policy if exists "Accesso completo strumenti per service role" on public.resources;
create policy "Accesso completo strumenti per service role"
  on public.resources for all
  using (auth.role() = 'service_role');

-- Resource Downloads: NESSUNA lettura pubblica (solo admin autenticato e service_role)
drop policy if exists "Lettura download solo utenti autenticati" on public.resource_downloads;
create policy "Lettura download solo utenti autenticati"
  on public.resource_downloads for all
  using (auth.role() = 'authenticated');

drop policy if exists "Accesso completo download per service role" on public.resource_downloads;
create policy "Accesso completo download per service role"
  on public.resource_downloads for all
  using (auth.role() = 'service_role');

-- 5. Bucket Supabase Storage per PDF e Immagini scaricabili (fino a 15MB)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'clinical-resources',
  'clinical-resources',
  true,
  15728640,
  array['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/avif']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 15728640,
  allowed_mime_types = array['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/avif'];

drop policy if exists "Accesso pubblico in lettura per clinical-resources" on storage.objects;
create policy "Accesso pubblico in lettura per clinical-resources"
  on storage.objects for select
  using (bucket_id = 'clinical-resources');

drop policy if exists "Gestione clinical-resources per service role e admin" on storage.objects;
create policy "Gestione clinical-resources per service role e admin"
  on storage.objects for all
  using (bucket_id = 'clinical-resources');

-- 6. Popolamento iniziale: "La Mia Mappa Emotiva" (pdf1.pdf)
insert into public.resources (
  id,
  title,
  slug,
  description,
  category,
  file_url,
  file_name,
  file_type,
  mime_type,
  file_size_bytes,
  preview_image_url,
  target_audience,
  is_published,
  download_count,
  sort_order
)
values (
  'a7e9c410-6b2d-4c8f-9e11-202611240001',
  'La Mia Mappa Emotiva',
  'la-mia-mappa-emotiva',
  'Scheda visiva di ascolto e alfabetizzazione emotiva per aiutare bambini, adolescenti e adulti a riconoscere cosa accade nel corpo, l''intensità dell''emozione e i propri bisogni nel momento presente — senza la pressione di dover trovare subito la parola giusta.',
  'Psicologia e benessere',
  '/Assets/strumenti/la-mia-mappa-emotiva.pdf',
  'La-Mia-Mappa-Emotiva.pdf',
  'pdf',
  'application/pdf',
  107517,
  '/Assets/strumenti/la-mia-mappa-emotiva-preview.jpg',
  'Colleghi, genitori, insegnanti e uso personale',
  true,
  0,
  1
)
on conflict (slug) do nothing;
