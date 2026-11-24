-- ==============================================================================
-- Lumina - Dott.ssa Giovanna Padalino: Security Hardening (Storage & RLS)
-- ==============================================================================
-- Restringe scrittura/modifica/eliminazione sui bucket Storage (blog-covers e
-- clinical-resources) esclusivamente a utenti autenticati e service_role,
-- mantenendo la lettura pubblica necessaria per mostrare immagini e scaricare PDF.

-- 1. Bucket blog-covers: rimuove policy troppo permissiva e la sostituisce
drop policy if exists "Upload copertine per service role e admin" on storage.objects;

create policy "Scrittura blog-covers solo admin e service role"
  on storage.objects for insert
  with check (
    bucket_id = 'blog-covers'
    and auth.role() in ('authenticated', 'service_role')
  );

create policy "Aggiornamento blog-covers solo admin e service role"
  on storage.objects for update
  using (
    bucket_id = 'blog-covers'
    and auth.role() in ('authenticated', 'service_role')
  )
  with check (
    bucket_id = 'blog-covers'
    and auth.role() in ('authenticated', 'service_role')
  );

create policy "Eliminazione blog-covers solo admin e service role"
  on storage.objects for delete
  using (
    bucket_id = 'blog-covers'
    and auth.role() in ('authenticated', 'service_role')
  );

-- 2. Bucket clinical-resources: rimuove policy troppo permissiva e la sostituisce
drop policy if exists "Gestione clinical-resources per service role e admin" on storage.objects;

create policy "Scrittura clinical-resources solo admin e service role"
  on storage.objects for insert
  with check (
    bucket_id = 'clinical-resources'
    and auth.role() in ('authenticated', 'service_role')
  );

create policy "Aggiornamento clinical-resources solo admin e service role"
  on storage.objects for update
  using (
    bucket_id = 'clinical-resources'
    and auth.role() in ('authenticated', 'service_role')
  )
  with check (
    bucket_id = 'clinical-resources'
    and auth.role() in ('authenticated', 'service_role')
  );

create policy "Eliminazione clinical-resources solo admin e service role"
  on storage.objects for delete
  using (
    bucket_id = 'clinical-resources'
    and auth.role() in ('authenticated', 'service_role')
  );
