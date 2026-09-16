"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "Quali sono gli orari e come si svolgono le sedute a Bologna e online?",
    answer: "Ricevo online dal lunedì al giovedì dalle 17:00 alle 21:00 tramite piattaforma protetta e confidenziale. In presenza ricevo nello studio di Bologna (in Via della Beverara, 224/6) il venerdì dalle 14:00 alle 21:00, esclusivamente su appuntamento."
  },
  {
    question: "Cosa significa approccio integrato tra psicologia, pedagogia e ABA?",
    answer: "Significa non limitarsi a una sola prospettiva. Integro il rigore dell'osservazione comportamentale (proprio della formazione ABA) con la profondità del modello cognitivo-comportamentale, sistemico-relazionale e psicodinamico. Questo permette di costruire interventi personalizzati che considerano sia gli aspetti emotivi che quelli educativi e contestuali."
  },
  {
    question: "Come posso prenotare un primo appuntamento o chiedere informazioni?",
    answer: "Puoi contattarmi direttamente su WhatsApp al +39 349 267 9598 per una prima presa di contatto rapida, prenotare in autonomia la data e l'orario tramite la mia agenda su MioDottore, oppure inviarmi un messaggio sul modulo nella pagina Contatti."
  },
  {
    question: "Le prestazioni psicologiche sono detraibili dalle tasse?",
    answer: "Sì, le prestazioni fornite da uno psicologo iscritto all'Albo professionale (Ordine Psicologi Emilia-Romagna n. 12479) sono a tutti gli effetti spese sanitarie e come tali sono detraibili fiscalmente al 19% in sede di dichiarazione dei redditi."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-[#F5EBE1] border-t border-[#DFCEBA]">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Domande Pratiche</span>
          </div>
          <h2 className="text-[#2C1E16] font-heading text-3xl md:text-5xl font-bold mb-4">
            Informazioni e Domande Frequenti
          </h2>
          <p className="text-base text-[#735948]">
            Tutto ciò che è utile sapere prima di iniziare il percorso.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="border border-[#DFCEBA] rounded-2xl overflow-hidden bg-white/95 shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-[#FAF4ED] transition-colors"
                >
                  <span className="font-heading font-semibold text-lg text-[#2C1E16] pr-6">
                    {f.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C85A32] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="p-6 pt-0 text-[#5C4436] leading-relaxed text-sm md:text-base border-t border-[#F0E4D5] mt-1">
                        {f.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}