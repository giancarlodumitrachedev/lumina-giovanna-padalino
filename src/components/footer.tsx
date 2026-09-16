"use client";

import { motion } from "framer-motion";
import { SmartLink } from "@/components/smart-link";
import { MessageCircle, Calendar, Phone, Mail, MapPin, Clock } from "lucide-react";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";

export function Footer() {
  return (
    <footer className="bg-[#241711] text-[#FAF6F0] pt-16 pb-10 overflow-hidden relative border-t border-[#3A281E]">
      {/* Kintsugi gold accent ambient lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C85A32]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Banner CTA */}
        <div className="text-center mb-12 sm:mb-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
            transition={{ duration: 0.7 }}
            className="bg-[#2E1F17]/80 backdrop-blur-sm border border-[#483326] p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl max-w-4xl mx-auto shadow-xl"
          >
            <div className="w-12 sm:w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mb-5 sm:mb-6" />
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-heading font-bold mb-3 sm:mb-4 max-w-2xl mx-auto leading-snug sm:leading-tight text-[#FAF6F0]">
              Iniziamo insieme il tuo percorso di ascolto e consapevolezza
            </h2>
            <p className="text-[#FAF6F0]/75 mb-6 sm:mb-8 max-w-2xl mx-auto text-xs sm:text-sm md:text-base leading-relaxed">
              Ricevo online dal lunedì al giovedì e in studio a Bologna il venerdì, per percorsi personalizzati rivolti a bambini, adolescenti, giovani adulti, adulti e famiglie.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4">
              <a
                href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20vorrei%20richiedere%20informazioni%20per%20un%20appuntamento."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-medium rounded-full transition-all flex items-center justify-center gap-2 shadow text-sm sm:text-base"
              >
                <MessageCircle className="w-4 h-4" />
                Scrivimi su WhatsApp
              </a>

              <a
                href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-[#C85A32] hover:bg-[#AF4621] text-white font-medium rounded-full transition-all flex items-center justify-center gap-2 shadow text-sm sm:text-base"
              >
                <Calendar className="w-4 h-4" />
                Prenota su MioDottore
              </a>

              <SmartLink
                href="/contatti"
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 border border-[#FAF6F0]/25 text-[#FAF6F0] font-medium rounded-full hover:bg-white/10 transition-colors text-center text-sm sm:text-base"
              >
                Tutti i contatti
              </SmartLink>
            </div>
          </motion.div>
        </div>

        {/* Footer Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 sm:mb-14">
          <div className="space-y-4">
            <h3 className="text-xl font-heading font-bold text-[#FAF6F0]">
              Dott.ssa Giovanna Padalino
            </h3>
            <p className="text-xs text-[#FAF6F0]/70 leading-relaxed">
              Psicologa Clinica, Pedagogista e Tecnico ABA.
              <br />
              Iscritta all'Ordine degli Psicologi dell'Emilia-Romagna – Albo A n. 12479.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.facebook.com/gvpadalino.psicologa"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3A281E] hover:bg-primary flex items-center justify-center text-[#FAF6F0] transition-colors"
                title="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/gvpadalino.psicologa/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3A281E] hover:bg-[#C85A32] flex items-center justify-center text-[#FAF6F0] transition-colors"
                title="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/393492679598"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3A281E] hover:bg-emerald-600 flex items-center justify-center text-[#FAF6F0] transition-colors"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#3A281E] hover:bg-[#C85A32] flex items-center justify-center text-[#FAF6F0] transition-colors"
                title="MioDottore"
              >
                <Calendar className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#FAF6F0]/90 text-sm uppercase tracking-wider">
              Pagine
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF6F0]/70">
              <li><SmartLink href="/" className="hover:text-primary transition-colors">Home</SmartLink></li>
              <li><SmartLink href="/chi-sono" className="hover:text-primary transition-colors">Chi Sono</SmartLink></li>
              <li><SmartLink href="/servizi" className="hover:text-primary transition-colors">Aree di Intervento</SmartLink></li>
              <li><SmartLink href="/blog" className="hover:text-primary transition-colors">Spazio Accogliente (Blog)</SmartLink></li>
              <li><SmartLink href="/contatti" className="hover:text-primary transition-colors">Contatti & Prenotazioni</SmartLink></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#FAF6F0]/90 text-sm uppercase tracking-wider">
              Aree Cliniche
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF6F0]/70">
              <li>Neurodivergenze & ADHD</li>
              <li>Difficoltà evolutive & scolastiche</li>
              <li>Sostegno ad adolescenti & giovani adulti</li>
              <li>Supporto alla genitorialità</li>
              <li>Ansia, burnout & autostima</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#FAF6F0]/90 text-sm uppercase tracking-wider">
              Orari & Sede
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FAF6F0]/70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>Via della Beverara, 224/6, Bologna</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                <div className="text-xs space-y-1">
                  <p><strong className="text-white/90">Online:</strong> Lun - Gio 17:00 - 21:00</p>
                  <p><strong className="text-white/90">In Studio:</strong> Ven 14:00 - 21:00 (su appuntamento)</p>
                </div>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a href="tel:+393492679598" className="hover:text-primary transition-colors">+39 349 267 9598</a>
              </li>
              <li className="pt-2 text-xs text-[#FAF6F0]/50">
                <SmartLink href="/privacy" className="hover:text-primary underline mr-3">Privacy</SmartLink>
                <SmartLink href="/termini" className="hover:text-primary underline">Termini</SmartLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Powered by Lumina */}
        <div className="pt-8 border-t border-[#3A281E] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-[#FAF6F0]/50">
          <p>© {new Date().getFullYear()} Dott.ssa Giovanna V. Padalino. Tutti i diritti riservati.</p>
          <p>
            <a
              href="https://www.luminadigital.it"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FAF6F0]/80 hover:text-primary transition-colors font-medium underline underline-offset-2"
            >
              Powered by Lumina™
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
