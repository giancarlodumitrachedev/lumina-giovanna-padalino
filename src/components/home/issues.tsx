"use client";

import { motion } from "framer-motion";
import { GraduationCap, Brain, Users, Sparkles, HeartHandshake, ShieldCheck } from "lucide-react";

const areas = [
  {
    title: "Disturbi Evolutivi & Difficoltà Scolastiche",
    subtitle: "ADHD, DSA, Metodo di Studio e Sovraccarico",
    description: "Supporto mirato per bambini e ragazzi con ADHD, disturbi specifici dell'apprendimento e fatiche scolastiche. Interventi su misura per superare il senso di frustrazione e valorizzare il potenziale.",
    icon: <GraduationCap className="w-6 h-6" />
  },
  {
    title: "Neurodivergenze & Spettro del Neurosviluppo",
    subtitle: "Lettura Funzionale & Interventi ABA",
    description: "Comprensione profonda del funzionamento neurodivergente, integrando l'osservazione comportamentale con gli aspetti emotivi e relazionali in contesti educativi e familiari.",
    icon: <Brain className="w-6 h-6" />
  },
  {
    title: "Adolescenti e Giovani Adulti",
    subtitle: "Identità, Relazioni e Ansia da Prestazione",
    description: "Accompagnamento nelle fasi cruciali di transizione, gestione dell'ansia da studio o lavoro, burnout giovanile, difficoltà relazionali e costruzione dell'autostima.",
    icon: <Users className="w-6 h-6" />
  },
  {
    title: "Genitorialità & Alleanza con la Scuola",
    subtitle: "Sostegno alle Famiglie ed Équipe",
    description: "Consulenza pedagogica e psicologica ai genitori, mediazione con insegnanti ed équipe multidisciplinari per creare contesti inclusivi e sereni attorno al minore.",
    icon: <HeartHandshake className="w-6 h-6" />
  },
  {
    title: "Ansia, Burnout & Gestione Emotiva",
    subtitle: "Adulti e Professionisti",
    description: "Percorsi per comprendere i segnali del corpo e della mente, trasformando i momenti di blocco emotivo in occasioni di riequilibrio e conoscenza profonda di sé.",
    icon: <ShieldCheck className="w-6 h-6" />
  },
  {
    title: "Neuropsicologia & Psicodiagnostica",
    subtitle: "Valutazione Clinica Integrata",
    description: "Inquadramento diagnostico attento e rispettoso della persona, orientato a individuare risorse e strategie concrete piuttosto che meri confini sintomatologici.",
    icon: <Sparkles className="w-6 h-6" />
  }
];

export function IssuesGrid() {
  return (
    <section className="py-14 sm:py-20 md:py-28 bg-[#FBF8F3] border-t border-[#E8DDCF]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-16"
        >
          <span className="text-[#C85A32] font-semibold tracking-widest uppercase text-xs mb-3 block">
            Specializzazioni & Competenze
          </span>
          <h2 className="text-[#2C1E16] font-heading text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-5">
            Aree di Intervento Clinico ed Educativo
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#6B5547] leading-relaxed">
            Unire psicologia clinica, pedagogia e lavoro educativo per comprendere la persona nella sua interezza, senza fermarsi al sintomo.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {areas.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl shadow-xs sm:shadow-sm border border-[#E8DDCF] hover:shadow-md hover:border-[#C85A32]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 sm:w-13 sm:h-13 bg-[#F5EFEB] text-[#C85A32] rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-105 group-hover:bg-[#C85A32] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-semibold text-[#8C6D58] uppercase tracking-wider block mb-1">
                  {item.subtitle}
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-[#2C1E16] mb-2 sm:mb-3 group-hover:text-[#C85A32] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5C4436] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}