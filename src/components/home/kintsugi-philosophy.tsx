"use client";

import { motion } from "framer-motion";
import { Sparkles, Feather, Film, Compass } from "lucide-react";
import { KintsugiVase, AutumnBranch } from "@/components/decorations/autumn-decorations";

export function KintsugiPhilosophySection() {
  return (
    <section className="py-20 md:py-32 bg-[#F2E5D5] relative overflow-hidden border-y border-[#DFCEBA]">
      {/* Background Graphic References to Kintsugi Vase #2 */}
      <div className="absolute top-1/2 -left-12 -translate-y-1/2 pointer-events-none z-0 hidden lg:block">
        <KintsugiVase className="w-52 h-72" opacity={0.22} />
      </div>

      {/* Stylized Autumn Leaves background accents */}
      <div className="absolute bottom-0 right-0 translate-x-8 translate-y-6 pointer-events-none z-0">
        <AutumnBranch className="w-48 h-56 opacity-70" flipped />
      </div>

      {/* Visual Kintsugi Gold Veins Background Accents */}
      <svg
        className="absolute top-0 right-0 w-96 h-96 opacity-30 pointer-events-none stroke-[#D4AF37]"
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M400,0 C320,60 280,140 220,170 C160,200 130,280 80,310 C40,330 20,380 0,400"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
        <path
          d="M280,140 C220,110 180,70 120,60"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M160,200 C180,260 210,320 230,390"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8D6C2] text-[#5C2A14] text-xs font-semibold uppercase tracking-widest mb-6 border border-[#DFCEBA]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Manifesto Clinico & Filosofico</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-[#2C1E16] mb-6 leading-tight">
            La mia idea di psicologia
          </h2>

          <div className="kintsugi-line max-w-xs mx-auto mb-8" />

          <p className="text-xl md:text-2xl text-[#5C2A14] font-heading italic leading-relaxed">
            "Credo in una psicologia che non si limiti alla riduzione del sintomo. Dietro ogni comportamento ci sono un bisogno, una storia e un significato che meritano ascolto."
          </p>
        </motion.div>

        {/* Central Kintsugi Philosophy Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl p-8 md:p-14 shadow-lg border border-[#DFCEBA] relative overflow-hidden mb-16"
        >
          <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-[#D4AF37] via-[#C85A32] to-[#D4AF37]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-5 text-[#3A281E] leading-relaxed text-base md:text-lg">
              <p className="font-medium text-lg md:text-xl text-[#2C1E16]">
                Mi riconosco nella filosofia del <span className="text-[#C85A32] font-semibold">Kintsugi</span>, l'antica arte giapponese che ripara gli oggetti in ceramica valorizzandone le fratture con l'oro.
              </p>
              <p>
                Le crepe non vengono nascoste: diventano parte integrante della loro storia e testimoniano la capacità di trasformarsi senza perdere la propria identità.
              </p>
              <p>
                Allo stesso modo, credo che le nostre ferite, le fragilità e le parti più vulnerabili non siano difetti da eliminare, ma esperienze che, se comprese e accolte, possono rivelarsi una straordinaria risorsa.
              </p>
              <p className="italic text-[#5C4436] bg-[#F5EBE1] p-4 rounded-xl border-l-4 border-[#C59B27]">
                "Avendo lavorato in molti contesti complessi ho capito che le ferite non definiscono chi siamo. Raccontano la strada che abbiamo percorso. Quando impariamo a integrarle, diventano il punto saldo da cui ripartire."
              </p>
            </div>

            <div className="lg:col-span-4 bg-[#F5EBE1] rounded-2xl p-6 border border-[#DFCEBA] text-center flex flex-col items-center justify-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#EADBCB] flex items-center justify-center text-[#C59B27] shadow-inner">
                <Compass className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-bold text-xl text-[#2C1E16]">
                Integrazione, non cancellazione
              </h4>
              <p className="text-xs text-[#735948] leading-relaxed">
                Non si tratta di cancellare le nostre ombre, ma di riconoscerle e permettere che convivano con la nostra luce, le nostre risorse e i nostri valori autentici.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3 Pillars: Oltre il Sintomo, Scrittura, Cinema/Metafore */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/90 rounded-2xl p-7 shadow-sm border border-[#DFCEBA] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F5EBE1] text-[#C85A32] flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6 text-[#C59B27]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#2C1E16] mb-3">
                Oltre il Sintomo
              </h3>
              <p className="text-sm text-[#5C4436] leading-relaxed">
                Ogni comportamento ha una funzione. Comprendere una persona significa osservare la sua storia, i contesti in cui vive e il significato unico che ogni difficoltà assume.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 rounded-2xl p-7 shadow-sm border border-[#DFCEBA] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F5EBE1] text-[#C85A32] flex items-center justify-center mb-5">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#2C1E16] mb-3">
                La Potenza della Scrittura
              </h3>
              <p className="text-sm text-[#5C4436] leading-relaxed">
                Scrivere permette di dare forma a pensieri, emozioni ed esperienze sommerse, trasformando ciò che appare confuso in qualcosa di osservabile, rielaborabile e curativo.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/90 rounded-2xl p-7 shadow-sm border border-[#DFCEBA] hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#F5EBE1] text-[#C85A32] flex items-center justify-center mb-5">
                <Film className="w-6 h-6 text-[#C85A32]" />
              </div>
              <h3 className="text-xl font-heading font-bold text-[#2C1E16] mb-3">
                Cinema, Libri & Metafore
              </h3>
              <p className="text-sm text-[#5C4436] leading-relaxed">
                Linguaggi simbolici ed emotivi capaci di raggiungere la parte più profonda di noi. A volte una storia, un personaggio o un'immagine danno voce a ciò che non ha ancora parole.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
