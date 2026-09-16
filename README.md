# Dott.ssa Giovanna Padalino – Sito Istituzionale & Piattaforma Clinica

Piattaforma web ad alte prestazioni per la **Dott.ssa Giovanna V. Padalino**, Psicologa Clinica, Pedagogista e Tecnico ABA (Iscritta all'Ordine degli Psicologi dell'Emilia-Romagna – Albo A n. 12479).

Progettato e sviluppato con architettura Next.js 16 App Router, Tailwind CSS v4 e design system Lumina™ orientato alla medicina privata, psicologia clinica e neurodivergenze.

---

## 🎨 Identità Visiva e Filosofia Clinica
- **Palette Materica/Autunnale:** Terracotta Caldo Intenso (`#C85A32`), Crema Biscotto Naturale (`#F5EBE1`), Marrone Caffè Profondo (`#2C1E16`) e Accenti Oro Satinato (`#D4AF37`).
- **Filosofia Kintsugi:** Metafora centrale dell'arte giapponese di riparare le fratture con l'oro: valorizzare le cicatrici e trasformare le fragilità in punti di forza unici.
- **Tipografia:** Playfair Display (titoli eleganti e accoglienti) e Inter (corpo del testo ad alta leggibilità).
- **Conformità Sanitaria & GDPR:** Trattamento dati sensibili con consenso esplicito, banner cookie essenziali e testi legali completi.

---

## 🚀 Stack Tecnologico
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animazioni:** [Framer Motion](https://www.framer.com/motion/) con trigger ottimizzati
- **Iconografia:** [Lucide React](https://lucide.dev/)
- **Form & Email:** Server Actions (`"use server"`), validazione nativa e integrazione [Resend](https://resend.com/)
- **SEO & Metatags:** OpenGraph, Twitter Cards, Schema.org e metadati specifici per la clinica su dominio `giovannapadalino.it`

---

## ⚙️ Variabili d'Ambiente

Crea un file `.env.local` nella root del progetto o configuralo nelle impostazioni del tuo progetto su **Vercel**:

```env
# Chiave API Resend per l'invio delle email di contatto
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Destinatario delle notifiche di contatto ricevute dal modulo del sito
CONTACT_EMAIL=info@giovannapadalino.it
```

---

## 💻 Sviluppo Locale

1. **Installazione dipendenze:**
   ```bash
   npm install
   ```

2. **Avvio del server di sviluppo:**
   ```bash
   npm run dev
   ```
   Apri [http://localhost:3000](http://localhost:3000) nel browser.

3. **Verifica build di produzione:**
   ```bash
   npm run build
   npm run start
   ```

---

## 🌐 Pubblicazione su GitHub & Vercel

### 1. Caricamento su GitHub (Sostituzione Repository Esistente)

Per sincronizzare questo codice con il repository GitHub esistente:

```bash
# Inizializza git nella cartella del progetto
git init

# Collega il repository remoto (sostituisci con il tuo URL GitHub)
git remote add origin https://github.com/<TUO-USERNAME>/<TUO-REPO>.git

# Prepara tutti i file e crea il commit
git add .
git commit -m "feat: Lumina production release for giovannapadalino.it"

# Sostituisci il branch principale nel repository remoto
git branch -M main
git push -u -f origin main
```

### 2. Deploy su Vercel & Collegamento Dominio

1. Accedi a [Vercel](https://vercel.com/) e clicca su **"Add New..." -> "Project"**.
2. Importa il repository GitHub appena aggiornato.
3. Nella sezione **Environment Variables**, aggiungi:
   - `RESEND_API_KEY`: La tua chiave API Resend.
   - `CONTACT_EMAIL`: L'email della dottoressa (o della segreteria).
4. Clicca su **Deploy**.
5. Vai su **Project Settings -> Domains**:
   - Aggiungi `giovannapadalino.it` e `www.giovannapadalino.it`.
   - Segui le istruzioni DNS fornite da Vercel (Record A e CNAME).

---

## 🏛️ Struttura Pagine

- `/` — **Homepage:** Hero accogliente con foto studio, Aree di Competenza, Filosofia Kintsugi, Presentazione Professionista, Spazio Accogliente (Blog), Recensioni verificate, FAQ e CTA.
- `/chi-sono` — **Biografia & Metodo Clinico:** Titoli, iscrizione all'albo, percorso accademico, approccio Kintsugi integrato e foto ritratto.
- `/servizi` — **Aree di Intervento:** 6 schede cliniche dettagliate (Neurodivergenze & Spettro del Neurosviluppo, ADHD & Scuola, Infanzia, Adolescenti & Giovani Adulti, Genitorialità, Adulti & Burnout).
- `/contatti` — **Contatti & Prenotazioni:** Canali diretti (WhatsApp, MioDottore, Instagram, Facebook), modulo con consenso GDPR conforme, orari di ricevimento e mappa interattiva.
- `/blog` — **Spazio Accogliente:** Articoli divulgativi e approfondimenti clinici (con pagine dinamiche `/blog/[slug]`).
- `/privacy` e `/termini` — **Note Legali & GDPR:** Informativa completa sul trattamento dei dati conforme alle normative sanitarie italiane.

---

## ✒️ Licenza & Crediti
© 2026 Dott.ssa Giovanna V. Padalino. Tutti i diritti riservati.  
Powered by [Lumina™](https://www.luminadigital.it)
