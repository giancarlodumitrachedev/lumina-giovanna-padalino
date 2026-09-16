import { getDemoParams } from "@/lib/demo-params";
import { SmartLink } from "@/components/smart-link";
import {
  CheckCircle2,
  Sparkles,
  Calendar,
  MessageCircle,
  GraduationCap,
  Brain,
  Users,
  HeartHandshake,
  ShieldCheck,
  Compass,
  ArrowRight
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";

export const metadata = {
  title: "Aree di Intervento & Servizi",
  description:
    "Servizi di sostegno psicologico e pedagogico a Bologna e online per bambini, adolescenti, giovani adulti, adulti e famiglie. Specializzata in ADHD, DSA, neurodivergenze e scuola.",
};

const serviceCards = [
  {
    title: "Neurodivergenze & Spettro del Neurosviluppo",
    badge: "Bambini, Ragazzi e Adulti",
    icon: <Brain className="w-6 h-6 text-[#C85A32]" />,
    format: "In presenza e online",
    description:
      "Spettro autistico, profili complessi e interventi ABA. Comprensione del funzionamento neurodivergente integrando l'osservazione comportamentale con gli aspetti emotivi e relazionali.",
    highlights: ["Interventi basati su evidenze", "Lettura funzionale personalizzata", "Valorizzazione dell'unicità"]
  },
  {
    title: "Disturbi Evolutivi & Difficoltà Scolastiche",
    badge: "Età Evolutiva & Scuola",
    icon: <GraduationCap className="w-6 h-6 text-[#C59B27]" />,
    format: "Bologna e online",
    description:
      "ADHD, disturbi specifici dell'apprendimento (DSA), BES e metodo di studio. Supporto mirato per superare il sovraccarico cognitivo, la frustrazione e riscoprire l'autoefficacia.",
    highlights: ["Potenziamento metodo di studio", "Gestione fatica attentiva", "Strategie per l'autonomia"]
  },
  {
    title: "Difficoltà Emotive & Comportamentali nell'Infanzia",
    badge: "Infanzia & Pre-adolescenza",
    icon: <HeartHandshake className="w-6 h-6 text-[#C85A32]" />,
    format: "In studio e online",
    description:
      "Accompagnamento nei momenti di disregolazione emotiva, ansia infantile, oppositività o chiusura, lavorando in sinergia costante con il contesto familiare ed educativo.",
    highlights: ["Spazio d'ascolto protetto", "Coinvolgimento della famiglia", "Linguaggi espressivi e simbolici"]
  },
  {
    title: "Sostegno ad Adolescenti & Giovani Adulti",
    badge: "Adolescenti & Universitari",
    icon: <Users className="w-6 h-6 text-[#C59B27]" />,
    format: "Presenza o videochiamata",
    description:
      "Costruzione dell'identità, gestione dell'ansia da prestazione scolastica o universitaria, burnout giovanile, difficoltà relazionali e orientamento nei momenti di transizione.",
    highlights: ["Nessun giudizio o forzatura", "Cinema, metafore e scrittura", "Riequilibrio dell'autostima"]
  },
  {
    title: "Genitorialità & Alleanza Scuola-Famiglia",
    badge: "Genitori & Équipe",
    icon: <Compass className="w-6 h-6 text-[#C85A32]" />,
    format: "Consulenze dedicate",
    description:
      "Consulenza pedagogica e psicologica per genitori. Mediazione con insegnanti, figure scolastiche ed équipe sociosanitarie per creare un ambiente sereno e coerente attorno al minore.",
    highlights: ["Supporto nei momenti di crisi", "Incontri con gli insegnanti", "Strategie educative condivise"]
  },
  {
    title: "Ansia, Burnout & Consapevolezza negli Adulti",
    badge: "Adulti & Professionisti",
    icon: <ShieldCheck className="w-6 h-6 text-[#C59B27]" />,
    format: "Studio a Bologna e online",
    description:
      "Percorsi per comprendere i segnali del corpo e della mente, gestire l'ansia e il senso perenne di inadeguatezza, trasformando le vulnerabilità in punti saldi di ripartenza.",
    highlights: ["Approccio cognitivo-integrato", "Ascolto delle ferite (Kintsugi)", "Crescita ed equilibrio autentico"]
  },
];

const percorsoAree = [
  {
    title: "Comprensione del funzionamento neurodivergente",
    desc: "Dare un nome e un significato alle proprie fatiche attentive ed evolutive, valorizzando le risorse personali."
  },
  {
    title: "Costruzione di strategie di studio su misura",
    desc: "Gestione del sovraccarico cognitivo ed emotivo per affrontare la scuola o l'università con serenità."
  },
  {
    title: "Regolazione emotiva e gestione dell'ansia",
    desc: "Imparare a riconoscere gli stati di attivazione interna e rielaborare le vulnerabilità senza sentirsi sbagliati."
  },
  {
    title: "Miglioramento della comunicazione e delle relazioni",
    desc: "Favorire relazioni significative e inclusive sia all'interno del nucleo familiare che nei contesti sociali."
  },
  {
    title: "Integrazione della propria storia personale",
    desc: "Attraverso la scrittura riflessiva, il cinema e le metafore narrative, secondo l'approccio del Kintsugi."
  },
  {
    title: "Sviluppo dell'autonomia e dell'autoefficacia",
    desc: "Costruire strumenti pratici ed emotivi duraturi per camminare con sicurezza e fiducia nel proprio futuro."
  }
];

export default async function ServiziPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await getDemoParams(searchParams);

  return (
    <div className="py-16 md:py-24 bg-[#F5EBE1] min-h-screen relative overflow-hidden">
      {/* Decorative foliage in background */}
      <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 pointer-events-none z-0">
        <AutumnBranch className="w-48 h-56 opacity-60" flipped />
      </div>
      <div className="absolute bottom-1/3 left-0 -translate-x-8 pointer-events-none z-0">
        <AutumnBranch className="w-44 h-52 opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#EADBCB] text-[#5C2A14] text-xs font-semibold mb-4 tracking-wide uppercase border border-[#DFCEBA]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Aree di Competenza Clinica & Pedagogica</span>
          </div>
          <h1 className="text-[#2C1E16] font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Di cosa mi occupo
          </h1>
          <p className="text-base sm:text-lg text-[#6B5547] leading-relaxed">
            Interventi personalizzati in presenza a Bologna (venerdì) e online (lunedì-giovedì), unendo psicologia clinica, pedagogia ed esperienza educativa per guardare sempre oltre il sintomo.
          </p>
        </div>

        {/* Clinical Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {serviceCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-3xl p-8 shadow-sm border border-[#DFCEBA] hover:shadow-md hover:border-[#C85A32]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#F5EBE1] flex items-center justify-center group-hover:scale-105 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-[#8C6D58] bg-[#F5EBE1] px-3 py-1 rounded-full border border-[#DFCEBA]">
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-xl text-[#2C1E16] mb-3 group-hover:text-primary transition-colors leading-snug">
                  {card.title}
                </h3>

                <p className="text-sm text-[#5C4436] leading-relaxed mb-6">
                  {card.description}
                </p>

                <div className="space-y-2 border-t border-[#F0E4D5] pt-4 mb-6">
                  {card.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-[#735948]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <SmartLink
                  href="/contatti"
                  className="w-full inline-flex items-center justify-between text-xs font-semibold text-[#C85A32] group-hover:text-[#AF4621] py-2 border-t border-[#F0E4D5]"
                >
                  <span>Richiedi informazioni per quest'area</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </SmartLink>
              </div>
            </div>
          ))}
        </div>

        {/* Second Section: Cosa costruiremo insieme */}
        <div className="bg-[#FAF4ED] rounded-3xl p-8 md:p-14 shadow-sm border border-[#DFCEBA] mb-16">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32] block mb-2">
              Metodologia & Obiettivi Condivisi
            </span>
            <h2 className="text-[#2C1E16] font-heading text-2xl md:text-4xl font-bold mb-3">
              Cosa costruiremo insieme durante il percorso
            </h2>
            <p className="text-sm md:text-base text-[#6B5547] leading-relaxed">
              Ogni percorso viene calibrato sulla persona o sulla famiglia, integrando obiettivi concreti a breve termine con una crescita personale duratura.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {percorsoAree.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/95 p-6 rounded-2xl border border-[#DFCEBA] shadow-xs flex flex-col justify-start"
              >
                <div className="flex items-center gap-2.5 mb-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#EADBCB] text-[#C85A32] flex items-center justify-center shrink-0 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <h4 className="font-heading font-semibold text-base text-[#2C1E16] leading-snug">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs text-[#5C4436] leading-relaxed pl-8.5">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action CTA Block */}
        <div className="text-center bg-white/95 p-8 md:p-12 rounded-3xl border border-[#DFCEBA] shadow-sm">
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto rounded-full mb-4" />
          <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#2C1E16] mb-3">
            Inizia il tuo percorso con un primo colloquio
          </h3>
          <p className="text-sm md:text-base text-[#735948] max-w-xl mx-auto mb-6 leading-relaxed">
            Ricevo online dal lunedì al giovedì (17:00 - 21:00) e nello studio di Bologna il venerdì (14:00 - 21:00 su appuntamento).
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <SmartLink
              href="/contatti"
              className="w-full sm:w-auto bg-primary hover:bg-[#AF4621] text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-md terracotta-glow"
            >
              Fissa un appuntamento
            </SmartLink>

            <a
              href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#F5EBE1] hover:bg-[#EADBCB] text-[#2C1E16] px-6 py-3.5 rounded-full font-medium transition-all border border-[#DFCEBA] flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-primary" />
              <span>Agenda MioDottore</span>
            </a>

            <a
              href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20vorrei%20informazioni%20sui%20servizi."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3.5 rounded-full font-medium transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Diretto</span>
            </a>

            <a
              href="https://www.instagram.com/gvpadalino.psicologa/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto bg-[#FAF4ED] hover:bg-[#EADBCB] text-[#C85A32] px-6 py-3.5 rounded-full font-medium transition-all border border-[#DFCEBA] flex items-center justify-center gap-2"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
