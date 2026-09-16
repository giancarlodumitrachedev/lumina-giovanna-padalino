# Piano di Implementazione: Sito Dott.ssa Giovanna Padalino (Lumina Prototype)

Rinnovamento completo del prototipo per la **Dott.ssa Giovanna V. Padalino**, integrando le sue foto autentiche (`1.jpg` e `2.jpg`), la nuova palette calda/materica autunnale ispirata allo studio, i canali professionali (MioDottore, Facebook, WhatsApp), la sezione filosofica legata al **Kintsugi** ("La mia idea di psicologia"), la revisione dettagliata della sezione "Chi Sono" e la creazione del **Blog "Spazio Accogliente"** ottimizzato per SEO e posizionamento clinico.

---

## User Review Required

> [!IMPORTANT]
> **Asset e Immagini:** Verranno utilizzate le foto autentiche fornite:
> - `1.jpg` (Dott.ssa Giovanna Padalino nella poltrona in vimini con maglione terracotta) per la sezione **Chi Sono**.
> - `2.jpg` (Lo studio accogliente con poltrone, tavolino e quadro dell'albero) per la **Hero** e per presentare lo spazio d'ascolto.

> [!IMPORTANT]
> **Canali Esterni e Prenotazioni:** Verranno integrati in header, footer, hero e contatti:
> - Profilo **MioDottore**: `https://www.miodottore.it/profilo/giovanna-valentina-padalino`
> - Canale **Facebook**: `https://www.facebook.com/gvpadalino.psicologa`
> - Canale **WhatsApp Diretto**: `+39 349 267 9598` con messaggio amichevole precompilato.

---

## Proposed Changes

### Design System & Asset Setup

#### [MODIFY] [globals.css](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/app/globals.css)
- Sostituire la palette fredda/blu con la nuova palette autunnale e materica:
  - Sfondo principale: Crema/Avorio caldo (`#FBF8F3`)
  - Superfici/Card: Lino e argilla chiara (`#F5EFEB`, `#EDE4D8`)
  - Primario/CTA: Terracotta caldo (`#C85A32`, hover `#AF4621`)
  - Tipografia principale: Marrone profondo caffè (`#2C1E16`)
  - Dettagli Kintsugi: Oro satinato (`#D4AF37`, riflessi dorati morbidi)

#### [NEW] Assets copiate in `public/Assets/`
- Copia di `1.jpg` in `public/Assets/giovanna-padalino.jpg`
- Copia di `2.jpg` in `public/Assets/studio-hero.jpg`

---

### Layout, Navigazione & Contatti

#### [MODIFY] [header.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/components/header.tsx)
- Aggiunta voce "Blog" nel menu di navigazione
- Aggiunta pulsante rapido MioDottore / Prenota
- Aggiornamento stile con colori autunnali e logo coordinato

#### [MODIFY] [footer.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/components/footer.tsx)
- Collegamento a Facebook e WhatsApp
- Badge MioDottore
- Mantenimento rigoroso del link "Powered by Lumina™" verso `https://www.luminadigital.it`

---

### Sezione Filosofica "La Mia Idea di Psicologia" (Kintsugi)

#### [NEW] [kintsugi-philosophy.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/components/home/kintsugi-philosophy.tsx)
- Sezione dedicata alla metafora del Kintsugi, alla scrittura terapeutica e al cinema/letteratura
- Grafica materica con venature dorate sottili stile Kintsugi
- Inclusa sia in Homepage (al posto o a completamento della vecchia sezione dubbi) che nella pagina "Chi Sono"

---

### Homepage & Landing Page

#### [MODIFY] [hero.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/components/home/hero.tsx)
- Visualizzazione della foto dello studio autentico (`studio-hero.jpg` / `2.jpg`)
- Titoli e qualifiche: Dott.ssa Giovanna V. Padalino, Psicologa clinica, Pedagogista e Tecnico ABA
- Badge sede: Bologna & Online
- Pulsanti CTA verso WhatsApp, MioDottore e form appuntamenti

#### [MODIFY] [services.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/components/home/services.tsx)
- Inclusione esplicita nelle aree cliniche ed educative di:
  - Disturbi evolutivi specifici (ADHD, DSA)
  - Difficoltà scolastiche e metodo di studio
  - Supporto a bambini, adolescenti, giovani adulti, adulti e famiglie
  - Burnout, ansia e regolazione emotiva/comportamentale

#### [NEW] [blog-preview.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/components/home/blog-preview.tsx)
- Anteprima degli ultimi articoli di "Spazio Accogliente" in Homepage con link a `/blog`

#### [MODIFY] [page.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/app/page.tsx)
- Integrazione di tutte le nuove sezioni nella sequenza corretta con gestione preservata dei `searchParams`

---

### Pagina "Chi Sono"

#### [MODIFY] [chi-sono/page.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/app/chi-sono/page.tsx)
- Inserimento foto `1.jpg` (Dott.ssa Padalino nella poltrona di vimini)
- Testo integrale fornito dalla dottoressa, strutturato con eleganza tipografica ed evidenziazione dei passaggi cardine (formazione cognitivo-comportamentale, sistemico-relazionale, esperienza ABA/scuola, approccio integrato che va oltre il sintomo)
- Modulo integrato Kintsugi

---

### Blog "Spazio Accogliente" (SEO & Articoli Clinici)

#### [NEW] [blog-data.ts](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/lib/blog-data.ts)
- Database articoli tipizzato con categorie concordate:
  - `ADHD e neurodivergenze`
  - `Adolescenti e giovani adulti`
  - `Genitorialità e scuola`
  - `Ansia, autostima e relazioni`
  - `Psicologia e benessere`
- Contenuti completi, empatici e posizionati per la SEO clinica

#### [NEW] [blog/page.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/app/blog/page.tsx)
- Header con concept: "Dott.ssa Giovanna Padalino | Spazio Accogliente"
- Filtro istantaneo per categoria
- Barra di ricerca articoli in tempo reale
- Griglia card articoli in stile caldo, naturale e materico

#### [NEW] [blog/[slug]/page.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/app/blog/[slug]/page.tsx)
- Pagina completa di lettura con breadcrumbs, tempo di lettura, sommario concettuale, call to action per prenotazione su MioDottore / WhatsApp e articoli correlati

---

### Pagina Contatti

#### [MODIFY] [contatti/page.tsx](file:///c:/Users/User/.gemini/antigravity-ide/scratch/lumina-giovanna-padalino/src/app/contatti/page.tsx)
- Sezione dedicata a WhatsApp con avvio chat in 1 click
- Box MioDottore per prenotazione autonoma dell'agenda
- Mappa interattiva su Bologna

---

## Verification Plan

### Automated Verification
- Controllo tipi TypeScript: `npx tsc --noEmit`
- Build Next.js di produzione: `npm run build` per confermare zero errori di compilazione e corretta generazione delle route statiche e dinamiche

### Manual & Interactive Verification
- Navigazione con browser sul dev server (`http://localhost:3000`):
  - Verifica della Homepage con nuova palette, foto studio e sezione Kintsugi
  - Verifica della pagina "Chi Sono" con foto `1.jpg` e testo completo
  - Verifica della pagina "Blog" con filtro categorie e barra di ricerca funzionanti
  - Verifica della lettura di un singolo articolo (`/blog/adhd-negli-adulti`)
  - Verifica dei link esterni (MioDottore, Facebook, WhatsApp, Powered by Lumina)