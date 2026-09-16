"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SmartLink } from "@/components/smart-link";
import { MessageCircle, Calendar, MapPin, Sparkles } from "lucide-react";
import { AutumnBranch, KintsugiVase } from "@/components/decorations/autumn-decorations";

export function HeroSection({ field }: { field?: string }) {
  return (
    <section className="relative pt-16 pb-16 lg:pt-28 lg:pb-24 overflow-hidden bg-[#F5EBE1]">
      {/* Decorative Autumn Leaves in background (like user's reference illustration) */}
      <div className="absolute top-0 left-0 -translate-x-6 -translate-y-4 pointer-events-none z-0">
        <AutumnBranch className="w-36 h-44 opacity-65 md:opacity-80" />
      </div>
      <div className="absolute top-1/2 -right-8 -translate-y-1/2 pointer-events-none z-0">
        <AutumnBranch className="w-44 h-52 opacity-60 md:opacity-75" flipped />
      </div>

      {/* Kintsugi Vase background reference #1 */}
      <div className="absolute -bottom-10 left-1/3 pointer-events-none z-0 hidden md:block">
        <KintsugiVase className="w-36 h-48" opacity={0.16} />
      </div>

      {/* Warm ambient radial glows */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#E7CEB5]/50 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4 pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#D4AF37]/15 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column Text */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#EADBCB] text-[#5C2A14] text-xs font-semibold mb-5 tracking-wide uppercase border border-[#DFCEBA] shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Psicologa Clinica • Pedagogista • Tecnico ABA</span>
            </div>

            {/* Titolo leggermente più piccolo per una composizione più raffinata */}
            <h1 className="text-[#2C1E16] font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.18] tracking-tight mb-5">
              Uno spazio accogliente per ascoltarsi e ritrovarsi
            </h1>

            <p className="text-base sm:text-lg text-[#5C4436] leading-relaxed mb-6 max-w-xl">
              Sostegno psicologico rivolto a <strong>bambini, adolescenti, giovani adulti, adulti e famiglie</strong>. Specializzata in neurodivergenze (ADHD, DSA), difficoltà scolastiche ed emotive, guidata dall'unicità della tua storia.
            </p>

            {/* Location, Schedule & Ordine badge */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-[#735948] mb-8 pb-4 border-b border-[#DFCEBA] w-full">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                Bologna & Online
              </span>
              <span>•</span>
              <span>Online: Lun-Gio 17:00-21:00</span>
              <span>•</span>
              <span>Studio: Ven 14:00-21:00</span>
              <span>•</span>
              <span>Albo Psicologi E-R n. 12479</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <SmartLink
                href="/contatti"
                className="w-full sm:w-auto bg-primary hover:bg-[#AF4621] text-white px-7 py-3.5 rounded-full text-base font-medium transition-all shadow-md hover:shadow-lg terracotta-glow text-center"
              >
                Prenota un consulto
              </SmartLink>

              <a
                href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white/90 hover:bg-white text-[#2C1E16] border border-[#DFCEBA] px-6 py-3.5 rounded-full text-base font-medium transition-all flex items-center justify-center gap-2 shadow-sm text-center"
              >
                <Calendar className="w-4 h-4 text-primary" />
                <span>Agenda MioDottore</span>
              </a>

              <a
                href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20vorrei%20richiedere%20informazioni%20per%20un%20appuntamento."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-emerald-800 hover:text-emerald-900 bg-emerald-100/80 hover:bg-emerald-100 border border-emerald-300 px-5 py-3.5 rounded-full text-base font-medium transition-all flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4 text-emerald-700" />
                <span>WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column Studio Image (2.jpg) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="lg:col-span-5 relative w-full max-w-lg mx-auto"
          >
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80">
              <Image
                src="/Assets/studio-hero.jpg"
                alt="Studio accogliente della Dott.ssa Giovanna Padalino a Bologna"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1E16]/40 via-transparent to-transparent pointer-events-none" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white bg-[#2C1E16]/65 backdrop-blur-md p-4 rounded-2xl border border-white/20">
                <p className="font-heading font-semibold text-sm">Lo Studio a Bologna</p>
                <p className="text-xs text-white/85">Via della Beverara, 224/6 • Ricevimento il venerdì</p>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-sm px-4 py-2.5 rounded-2xl shadow-lg border border-[#DFCEBA] flex items-center gap-2.5 z-20"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse" />
              <span className="text-xs font-semibold text-[#2C1E16]">Filosofia Kintsugi</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}