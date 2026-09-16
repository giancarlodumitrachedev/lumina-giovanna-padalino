"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    text: "La Dott.ssa Padalino ha saputo comprendere nostro figlio nelle sue fatiche scolastiche e attentive, senza mai farlo sentire sbagliato. Ha lavorato in sinergia con noi e con i suoi insegnanti restituendogli fiducia e serenità.",
    author: "Elena e Marco R.",
    role: "Genitori di un ragazzo con ADHD",
    initial: "E"
  },
  {
    text: "Nello studio di Bologna ho trovato un'atmosfera davvero accogliente e non giudicante. L'approccio che va oltre il sintomo e l'uso della scrittura mi hanno aiutato a superare un periodo di forte burnout e ansia.",
    author: "Davide P.",
    role: "Paziente adulto",
    initial: "D"
  },
  {
    text: "Un supporto preziosissimo sia dal punto di vista psicologico che educativo. Ci siamo sentiti ascoltati e guidati con grande sensibilità e competenza clinica.",
    author: "Francesca L.",
    role: "Paziente percorso familiare",
    initial: "F"
  }
];

export function ReviewsSection() {
  const [index, setIndex] = useState(0);

  const nextReview = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-20 md:py-28 bg-[#FAF6F0] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
          transition={{ duration: 0.8 }}
          className="bg-[#F5ECE0] rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative border border-[#E8DDCF]"
        >
          {/* Decorative Quote */}
          <Quote className="absolute top-6 left-6 md:top-10 md:left-10 w-16 h-16 md:w-20 md:h-20 text-[#C85A32]/10 -rotate-12 pointer-events-none" />

          <div className="flex-1 relative z-10 w-full mt-6 md:mt-0">
            <div className="flex items-center gap-1 text-[#C59B27] mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-xs text-[#786052] font-semibold ml-2">Esperienze di percorso</span>
            </div>

            <div className="min-h-[200px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-heading font-medium text-[#2C1E16] leading-relaxed mb-6">
                    "{reviews[index].text}"
                  </h3>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#C85A32] rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-md shrink-0">
                      {reviews[index].initial}
                    </div>
                    <div>
                      <p className="font-bold text-[#2C1E16] text-base">{reviews[index].author}</p>
                      <p className="text-[#786052] text-xs md:text-sm">{reviews[index].role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex gap-3 mt-8">
              <button
                onClick={prevReview}
                aria-label="Recensione precedente"
                className="w-11 h-11 rounded-full border border-[#D8C7B5] bg-white flex items-center justify-center text-[#2C1E16] hover:bg-[#C85A32] hover:text-white transition-colors focus:outline-none shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Prossima recensione"
                className="w-11 h-11 rounded-full bg-[#2C1E16] flex items-center justify-center text-white hover:bg-[#C85A32] transition-colors shadow-md focus:outline-none"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="w-full md:w-2/5 shrink-0 hidden md:block">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-xl border-2 border-white">
              <Image 
                src="/Assets/studio-hero.jpg" 
                alt="Studio accogliente Dott.ssa Giovanna Padalino" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
