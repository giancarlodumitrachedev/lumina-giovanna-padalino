-- ==============================================================================
-- Lumina - Dott.ssa Giovanna Padalino: Migrazione Tabella Post e Categorie Cliniche
-- ==============================================================================

-- 1. Creazione Tabella Articoli del Blog
create table if not exists public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  excerpt text not null,
  content text not null,
  category text not null check (category in (
    'ADHD e neurodivergenze',
    'Adolescenti e giovani adulti',
    'Genitorialità e scuola',
    'Ansia, autostima e relazioni',
    'Psicologia e benessere'
  )),
  read_time text default '5 min',
  cover_image text,
  is_published boolean default true,
  published_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Indice per velocizzare la ricerca per slug e categoria
create index if not exists idx_posts_slug on public.posts(slug);
create index if not exists idx_posts_category on public.posts(category);
create index if not exists idx_posts_published on public.posts(is_published, published_at desc);

-- 2. Abilitazione Row Level Security (RLS)
alter table public.posts enable row level security;

-- Policy di lettura pubblica (chiunque può leggere i post pubblicati)
drop policy if exists "Lettura pubblica per articoli pubblicati" on public.posts;
create policy "Lettura pubblica per articoli pubblicati"
  on public.posts for select
  using (is_published = true);

-- Policy di gestione totale per utenti autenticati (Dott.ssa Padalino nel portale)
drop policy if exists "Gestione articoli per utenti autenticati" on public.posts;
create policy "Gestione articoli per utenti autenticati"
  on public.posts for all
  using (auth.role() = 'authenticated');

-- Policy di gestione con service role per Server Actions / API backend
drop policy if exists "Accesso completo per service role" on public.posts;
create policy "Accesso completo per service role"
  on public.posts for all
  using (auth.role() = 'service_role');

-- 3. Popolamento iniziale con gli articoli approvati
insert into public.posts (title, slug, excerpt, content, category, read_time, published_at, is_published)
values
(
  'ADHD negli adulti: quando la difficoltà non è mancanza di volontà',
  'adhd-negli-adulti-non-e-mancanza-di-volonta',
  'Spesso considerata solo una condizione infantile, la neurodivergenza da deficit di attenzione negli adulti viene scambiata per pigrizia, disorganizzazione o ansia cronica. Come riconoscerla e fare pace con il proprio funzionamento.',
  '## Oltre l''etichetta: comprendere la neurodivergenza

Molti adulti arrivano alla consapevolezza del proprio ADHD dopo anni di fatiche silenziose. Spesso il percorso è contrassegnato da frasi sentite fin dai banchi di scuola: "è intelligente ma non si applica", "vive tra le nuvole", "se solo si sforzasse di più".

Queste etichette interiorizzate si trasformano nel tempo in un profondo senso di inadeguatezza, ansia da prestazione e, non di rado, burnout da ipercompensazione.

### Che cos''è davvero l''ADHD nell''adulto?

L''ADHD non è una carenza di attenzione, bensì una difficoltà nella regolazione dell''attenzione e delle funzioni esecutive. Il cervello neurodivergente funziona per interesse, urgenza e novità, non per mera importanza razionale.

Tra le manifestazioni più frequenti negli adulti troviamo:
- **Disregolazione dell''attenzione:** alternanza tra difficoltà di concentrazione su compiti noiosi e momenti di iperfocus totalizzante.
- **Difficoltà nella gestione del tempo (Time Blindness):** percepire il tempo in due sole dimensioni: "adesso" o "non adesso".
- **Fatica nella memoria di lavoro:** dimenticare appuntamenti o ciò che si stava facendo pochi istanti prima.
- **Ipersensibilità al rifiuto (RSD):** un''intensa reattività emotiva al giudizio altrui o al fallimento percepito.

### La prospettiva Kintsugi: valorizzare il funzionamento

La diagnosi o la comprensione del proprio funzionamento neurodivergente non è una condanna né una scusa: è una mappa.

Nel mio approccio, ispirato alla filosofia del Kintsugi, non cerchiamo di "aggiustare" una mente che non è rotta. Cerchiamo piuttosto di costruire strumenti, routine flessibili e alleanze con il proprio cervello, trasformando ciò che appariva come un limite in una caratteristica unica e ricca di creatività.',
  'ADHD e neurodivergenze',
  '5 min',
  '2026-02-28T10:00:00Z',
  true
),
(
  'Mio figlio non si impegna o sta facendo fatica? Come distinguere pigrizia, difficoltà e sovraccarico',
  'mio-figlio-non-si-impegna-o-sta-facendo-fatica',
  'Dietro il rifiuto di fare i compiti o i continui cali di rendimento scolastico si nascondono spesso fatiche attentive, DSA o blocchi emotivi. Una guida pedagogica per genitori e insegnanti per andare oltre il sintomo.',
  '## Il mito del bambino "pigro"

Nel lavoro clinico ed educativo con le famiglie, una delle domande più dolorose che i genitori si pongono è: "Perché sembra che non gliene importi nulla?".

La verità, osservata in anni di pratica tra scuola, interventi ABA e psicologia dell''età evolutiva, è che nessun bambino desidera fallire o essere etichettato come inadeguato. Quando un minore oppone rifiuto allo studio, quasi sempre stiamo osservando un meccanismo di difesa da un sovraccarico cognitivo o emotivo.

### I segnali del sovraccarico a scuola e a casa

1. **Lentezza esecutiva ed estenuanti pomeriggi sui libri:** quando un compito da mezz''ora richiede tre ore, la causa non è il disimpegno, ma una fatica nell''automatizzazione dei processi di lettura, scrittura o calcolo (segnali tipici di DSA o fatiche attentive).
2. **Oppositività al momento dei compiti:** rabbia, capricci o chiusura sono spesso la manifestazione di un''ansia anticipatoria del fallimento.
3. **Somatizzazioni frequenti:** mal di testa, mal di pancia la domenica sera o la mattina prima dell''ingresso a scuola.

### Come costruire un''alleanza scuola-famiglia

La soluzione non risiede nell''aumento delle punizioni o nella pressione al rendimento. Il primo passo è l''ascolto autentico:
- Differenziare tra abilità e prestazione.
- Introdurre strumenti compensativi e metodologie di studio visive ed esperienziali.
- Collaborare in sinergia con gli insegnanti per un Piano Didattico Personalizzato (PDP) realmente efficace e rispettoso.',
  'Genitorialità e scuola',
  '6 min',
  '2026-02-14T10:00:00Z',
  true
),
(
  'Quando l''autostima si costruisce sul confronto con gli altri',
  'quando-autostima-si-costruisce-sul-confronto',
  'Tra aspettative sociali e modelli irraggiungibili, misurare il proprio valore guardando i successi altrui alimenta un senso cronico di inferiorità. Come imparare ad ascoltare i propri bisogni autentici.',
  '## La trappola del paragone costante

Viviamo in un''epoca in cui le vite altrui ci vengono presentate filtrate, ordinate e costantemente vincenti. Per molti adolescenti e giovani adulti, ma anche per professionisti affermati, la misurazione del proprio valore personale è diventata dipendente da un confronto esterno incessante.

Il risultato? Una voce critica interna implacabile che dice: "non sto facendo abbastanza", "gli altri sono più avanti di me", "se mi fermo ho perso".

### Le radici dell''ansia da prestazione

L''ansia da prestazione non nasce nel vuoto. Spesso affonda le sue radici in una storia personale in cui l''affetto, l''approvazione o il riconoscimento sono stati associati al raggiungimento di determinati standard accademici o comportamentali.

Quando l''autostima è legata al "fare" anziché all''"essere", ogni battuta d''arresto diventa una ferita identitaria.

### La scrittura e il cinema come strumenti di rielaborazione

Nel percorso di accompagnamento psicologico, utilizziamo la metafora e la scrittura riflessiva per:
- Separare la propria identità dal ruolo o dalla performance.
- Dare un nome alle paure sottostanti (la paura del rifiuto, del vuoto o del giudizio).
- Riconoscere le proprie risorse interiori e riscoprire un senso di autoefficacia indipendente dal giudizio altrui.',
  'Ansia, autostima e relazioni',
  '4 min',
  '2026-02-02T10:00:00Z',
  true
)
on conflict (slug) do nothing;
