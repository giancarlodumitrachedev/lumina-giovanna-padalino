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
    <div className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 bg-[#F5EBE1] min-h-screen relative overflow-hidden">
      {/* Decorative foliage in background */}
      <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 pointer-events-none z-0">
        <AutumnBranch className="w-36 sm:w-48 h-44 sm:h-56 opacity-50 sm:opacity-60" flipped />
      </div>
      <div className="absolute bottom-1/3 left-0 -translate-x-8 pointer-events-none z-0">
        <AutumnBranch className="w-32 sm:w-44 h-40 sm:h-52 opacity-40 sm:opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 py-1.5 px-3 sm:px-4 rounded-full bg-[#EADBCB] text-[#5C2A14] text-[11px] sm:text-xs font-semibold mb-3 sm:mb-4 tracking-wide uppercase border border-[#DFCEBA]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
            <span>Aree di Competenza Clinica & Pedagogica</span>
          </div>
          <h1 className="text-[#2C1E16] font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
            Di cosa mi occupo
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#6B5547] leading-relaxed">
            Interventi personalizzati in presenza a Bologna (venerdì) e online (lunedì-giovedì), unendo psicologia clinica, pedagogia ed esperienza educativa per guardare sempre oltre il sintomo.
          </p>
        </div>

        {/* Clinical Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-14 sm:mb-20">
          {serviceCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-xs sm:shadow-sm border border-[#DFCEBA] hover:shadow-md hover:border-[#C85A32]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4 sm:mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#F5EBE1] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                    {card.icon}
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#8C6D58] bg-[#F5EBE1] px-2.5 sm:px-3 py-1 rounded-full border border-[#DFCEBA] truncate">
                    {card.badge}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg sm:text-xl text-[#2C1E16] mb-2 sm:mb-3 group-hover:text-primary transition-colors leading-snug">
                  {card.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C4436] leading-relaxed mb-4 sm:mb-6">
                  {card.description}
                </p>

                <div className="space-y-2 border-t border-[#F0E4D5] pt-3 sm:pt-4 mb-4 sm:mb-6">
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
                  className="w-full inline-flex items-center justify-between text-xs sm:text-sm font-semibold text-[#C85A32] group-hover:text-[#AF4621] py-2 border-t border-[#F0E4D5]"
                >
                  <span>Richiedi informazioni per quest'area</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </SmartLink>
              </div>
            </div>
          ))}
        </div>

        {/* Methodology & What we build together Section */}
        <div className="bg-[#EADBCB]/60 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-[#DFCEBA] mb-14 sm:mb-20">
          <div className="max-w-3xl mb-8 sm:mb-10">
            <span className="text-[#C85A32] font-semibold text-xs uppercase tracking-widest block mb-2">
              Metodologia & Obiettivi Condivisi
            </span>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl md:text-4xl text-[#2C1E16] mb-3">
              Cosa costruiremo insieme durante il percorso
            </h2>
            <p className="text-sm sm:text-base text-[#6B5547] leading-relaxed">
              Ogni percorso viene calibrato sulla persona o sulla famiglia, integrando obiettivi concreti a breve termine con una crescita personale duratura.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 md:gap-6">
            {percorsoAree.map((item, idx) => (
              <div key={idx} className="bg-white/90 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-[#DFCEBA] flex gap-3.5 sm:gap-4 items-start shadow-xs">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#EADBCB] text-[#5C2A14] flex items-center justify-center font-bold text-xs shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm sm:text-base text-[#2C1E16] mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#735948] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Booking CTA Banner */}
        <div className="bg-white/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 border border-[#DFCEBA] text-center shadow-sm max-w-4xl mx-auto">
          <div className="w-12 h-1 bg-[#D4AF37] mx-auto rounded-full mb-5" />
          <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#2C1E16] mb-3">
            Inizia il tuo percorso con un primo colloquio
          </h2>
          <p className="text-xs sm:text-sm text-[#735948] max-w-xl mx-auto mb-6 sm:mb-8">
            Ricevo online dal lunedì al giovedì (17:00 - 21:00) e nello studio di Bologna il venerdì (14:00 - 21:00 su appuntamento).
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <SmartLink
              href="/contatti"
              className="bg-primary hover:bg-[#AF4621] text-white px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-medium transition-all shadow-sm hover:shadow terracotta-glow text-center"
            >
              Fissa un appuntamento
            </SmartLink>
            <a
              href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#EADBCB] hover:bg-[#DFCDBB] text-[#2C1E16] px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all border border-[#DFCEBA] flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4 text-primary" />
              <span>Agenda MioDottore</span>
            </a>
            <a
              href="https://wa.me/393492679598"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Diretto</span>
            </a>
            <a
              href="https://www.instagram.com/gvpadalino.psicologa/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-rose-50 hover:bg-rose-100 text-[#9E3E26] px-6 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-semibold transition-all border border-rose-200 flex items-center justify-center gap-2"
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
