import Image from "next/image";
import { SmartLink } from "@/components/smart-link";
import { getDemoParams } from "@/lib/demo-params";
import { MessageCircle, Calendar, Sparkles, Award, MapPin, Clock, HeartHandshake } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";
import { KintsugiPhilosophySection } from "@/components/home/kintsugi-philosophy";

export const metadata = {
  title: "Chi Sono | Dott.ssa Giovanna V. Padalino - Psicologa a Bologna e Online",
  description: "Dott.ssa Giovanna V. Padalino: Psicologa clinica, Pedagogista e Tecnico ABA. Sostegno psicologico per bambini, adolescenti, giovani adulti, adulti e famiglie.",
};

export default async function ChiSonoPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await getDemoParams(searchParams);

  return (
    <div className="py-16 md:py-24 bg-[#F5EBE1] min-h-screen relative overflow-hidden">
      {/* Decorative Autumn foliage */}
      <div className="absolute top-0 left-0 -translate-x-6 -translate-y-4 pointer-events-none z-0">
        <AutumnBranch className="w-40 h-48 opacity-65" />
      </div>
      <div className="absolute top-1/3 right-0 translate-x-6 pointer-events-none z-0">
        <AutumnBranch className="w-44 h-52 opacity-55" flipped />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header Title & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#EADBCB] text-[#5C2A14] text-xs font-semibold mb-4 tracking-wide uppercase border border-[#DFCEBA]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Biografia Professionale & Metodo</span>
          </div>
          <h1 className="text-[#2C1E16] font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Dott.ssa Giovanna V. Padalino
          </h1>
          <p className="text-lg md:text-xl text-[#735948] font-heading italic">
            Psicologa clinica, Pedagogista e Tecnico ABA
          </p>
          <p className="text-xs text-[#8C6D58] mt-2 tracking-wide font-sans">
            Iscritta all'Ordine degli Psicologi dell'Emilia-Romagna – Albo A n. 12479
          </p>
        </div>

        {/* Profile Card & Bio Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Authentic Photo (1.jpg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image
                src="/Assets/giovanna-padalino.jpg"
                alt="Dott.ssa Giovanna V. Padalino nel suo studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>

            {/* Quick credentials card */}
            <div className="mt-6 bg-white/95 p-6 rounded-2xl shadow-sm border border-[#DFCEBA] space-y-3.5">
              <div className="flex items-center gap-3 text-sm text-[#2C1E16]">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <span>Via della Beverara, 224/6, Bologna & Online</span>
              </div>
              <div className="flex items-start gap-3 text-sm text-[#2C1E16]">
                <Clock className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <p><strong>Online:</strong> Lun - Gio 17:00 - 21:00</p>
                  <p><strong>In Studio:</strong> Ven 14:00 - 21:00</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2C1E16]">
                <Award className="w-4 h-4 text-[#C59B27] shrink-0" />
                <span>Ordine Psicologi E-R n. 12479</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#2C1E16]">
                <HeartHandshake className="w-4 h-4 text-primary shrink-0" />
                <span>Bambini, adolescenti, adulti, famiglie</span>
              </div>
              
              <div className="pt-3 border-t border-[#F0E4D5] flex flex-col gap-2.5">
                <a
                  href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-[#DFCEBA] hover:bg-[#F5EBE1] text-sm font-semibold text-[#2C1E16] transition-colors"
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  Prenota su MioDottore
                </a>
                <a
                  href="https://www.instagram.com/gvpadalino.psicologa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white border border-[#DFCEBA] hover:bg-[#F5EBE1] text-sm font-semibold text-[#C85A32] transition-colors"
                >
                  <InstagramIcon className="w-4 h-4" />
                  Profilo Instagram
                </a>
                <a
                  href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20vorrei%20richiedere%20informazioni%20per%20un%20appuntamento."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-sm font-semibold text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Scrivimi su WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative Biography */}
          <div className="lg:col-span-7 space-y-6 text-[#3A281E] leading-relaxed text-base md:text-lg">
            <div className="bg-white/95 p-8 md:p-10 rounded-3xl shadow-sm border border-[#DFCEBA] space-y-6">
              <p className="text-xl font-heading font-medium text-[#2C1E16] leading-snug">
                Mi occupo di sostegno psicologico rivolto a <strong>bambini, adolescenti, giovani adulti, adulti e famiglie</strong>.
              </p>

              <p>
                La mia formazione e il mio costante aggiornamento professionale si orientano principalmente verso le <strong>neurodivergenze, i disturbi del neurosviluppo, la psicologia scolastica, la neuropsicologia e la psicodiagnostica</strong>, integrando competenze psicologiche, pedagogiche ed educative.
              </p>

              <div className="bg-[#F5EBE1] p-5 rounded-2xl border-l-4 border-[#C85A32] italic text-[#5C4436]">
                "Lavoro con un approccio integrato che considera la persona nella sua complessità, all'interno delle relazioni e dei contesti in cui vive. Credo che comprendere una persona significhi andare oltre il sintomo, osservando la sua storia, le sue risorse e il significato che ogni comportamento assume nel suo percorso di vita."
              </div>

              <h3 className="font-heading font-bold text-2xl text-[#2C1E16] pt-2">
                Dall'ambito scolastico ed educativo alla clinica
              </h3>

              <p>
                Il mio percorso professionale nasce dall'incontro fecondo tra <strong>psicologia, pedagogia e lavoro educativo</strong>.
              </p>

              <p>
                Attualmente opero in ambito scolastico come educatrice specializzata e Tecnico ABA, all'interno di contesti educativi inclusivi. Questa esperienza sul campo mi ha permesso di sviluppare una lettura approfondita del funzionamento individuale, integrando l'osservazione comportamentale rigorosa con la comprensione empatica degli aspetti emotivi, relazionali e contestuali della persona.
              </p>

              <p>
                Parallelamente svolgo attività clinica come psicologa, ricevendo nel mio studio a <strong>Bologna</strong> (il venerdì) e <strong>online</strong> (dal lunedì al giovedì). Accompagno bambini, adolescenti, giovani adulti, adulti e famiglie nei momenti di difficoltà emotiva, ansia, burnout, problematiche relazionali e comportamentali, costruendo insieme percorsi personalizzati che tengano conto dell'assoluta unicità di ciascuno.
              </p>

              <h3 className="font-heading font-bold text-2xl text-[#2C1E16] pt-2">
                Il modello teorico e metodologico
              </h3>

              <p>
                La mia formazione parte dal modello <strong>cognitivo-comportamentale</strong> e si arricchisce dei contributi della prospettiva <strong>psicodinamica relazionale</strong> e <strong>sistemico-relazionale</strong>. Questo mi permette di leggere il disagio non come un fenomeno isolato, ma come il risultato dell'interazione tra caratteristiche individuali, storia di vita, relazioni significative e contesti di appartenenza.
              </p>

              <p>
                La lunga esperienza maturata nei servizi educativi e sociosanitari mi consente di collaborare attivamente con famiglie, scuole, équipe multidisciplinari e altri professionisti sanitari, garantendo interventi coerenti, stabili e integrati.
              </p>

              <div className="bg-[#F5EBE1] p-6 rounded-2xl border border-[#DFCEBA] text-[#2C1E16]">
                <h4 className="font-heading font-bold text-lg mb-2 text-[#C85A32]">
                  Il mio obiettivo terapeutico
                </h4>
                <p className="text-base leading-relaxed text-[#5C4436]">
                  "Il mio obiettivo non è aiutare le persone a diventare qualcun altro, ma accompagnarle nella comprensione di sé, affinché possano integrare la propria storia, valorizzare le proprie risorse e costruire un equilibrio autentico e rispettoso della propria unicità."
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <SmartLink
                  href="/contatti"
                  className="bg-primary hover:bg-[#AF4621] text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-md terracotta-glow"
                >
                  Richiedi un primo colloquio
                </SmartLink>
                <SmartLink
                  href="/blog"
                  className="bg-[#EADBCB] hover:bg-[#DFCEBA] text-[#2C1E16] px-6 py-3.5 rounded-full font-medium transition-all border border-[#DFCEBA]"
                >
                  Leggi i miei articoli sul Blog
                </SmartLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Kintsugi Manifesto */}
      <KintsugiPhilosophySection />
    </div>
  );
}
