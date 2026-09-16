"use client";

import { motion } from "framer-motion";
import { SmartLink } from "@/components/smart-link";
import { ArrowRight, Brain, Users, GraduationCap } from "lucide-react";

const services = [
  {
    title: "Interventi ABA & Neurodivergenze",
    description: "Programmi educativi e comportamentali personalizzati come Tecnico ABA specializzato, con lettura approfondita del funzionamento individuale.",
    icon: <Brain className="w-8 h-8" />
  },
  {
    title: "Sostegno Psicologico Integrato",
    description: "Percorsi per bambini, adolescenti, adulti e famiglie. Modello cognitivo-comportamentale integrato con prospettiva sistemica e relazionale.",
    icon: <Users className="w-8 h-8" />
  },
  {
    title: "Psicologia Scolastica & Difficoltà Evolutive",
    description: "Sostegno per ADHD, DSA e metodo di studio. Alleanza con scuole, insegnanti ed équipe multidisciplinari nei contesti inclusivi.",
    icon: <GraduationCap className="w-8 h-8" />
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-[#F5ECE0]/60 border-t border-[#E8DDCF]/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-[#C85A32] font-semibold tracking-wider uppercase text-xs mb-3 block">
              Metodologia Clinica
            </span>
            <h2 className="text-[#2C1E16] font-heading text-3xl md:text-5xl font-bold">
              Come posso aiutarti
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SmartLink
              href="/servizi"
              className="group inline-flex items-center text-[#C85A32] font-semibold hover:text-[#AF4621] transition-colors text-sm"
            >
              <span>Approfondisci tutte le aree</span>
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </SmartLink>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="bg-white rounded-3xl p-9 shadow-sm border border-[#E8DDCF] hover:shadow-md hover:border-[#C85A32]/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 text-[#C85A32] group-hover:scale-110 transition-transform duration-300">
                  {s.icon}
                </div>
                <h3 className="text-xl font-heading font-bold text-[#2C1E16] mb-3 group-hover:text-[#C85A32] transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-[#5C4436] leading-relaxed">
                  {s.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}