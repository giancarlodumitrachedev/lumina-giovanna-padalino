"use client";

import { useState, useEffect } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SmartLink } from "./smart-link";

export function UiEnhancements() {
  const [showScroll, setShowScroll] = useState(false);
  const [showCookie, setShowCookie] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);

    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      const timer = setTimeout(() => setShowCookie(true), 1500);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("scroll", handleScroll);
      };
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowCookie(false);
  };

  return (
    <>
      {/* Floating WhatsApp Button */}
      <aside aria-label="Contatto rapido WhatsApp">
        <a
          href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20vorrei%20richiedere%20informazioni%20per%20un%20appuntamento."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 p-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center group"
          title="Contatta la Dott.ssa Padalino su WhatsApp"
          aria-label="Contatta la Dott.ssa Padalino su WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 ease-in-out text-xs font-semibold px-0 group-hover:px-2">
            Scrivimi su WhatsApp
          </span>
        </a>
      </aside>

      {/* Scroll to top */}
      <AnimatePresence>
        {showScroll && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-22 right-6 z-40 p-2.5 bg-white border border-[#E8DDCF] text-[#2C1E16] hover:text-[#C85A32] rounded-full shadow-lg transition-colors"
            aria-label="Torna in cima"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cookie Banner */}
      <AnimatePresence>
        {showCookie && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-5xl mx-auto bg-[#FAF6F0]/95 backdrop-blur-md border border-[#E8DDCF] shadow-2xl rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 pointer-events-auto">
              <div className="text-sm text-[#5C4436] md:pr-8">
                <p className="font-heading font-semibold text-[#2C1E16] mb-1">Informativa sui Cookie</p>
                Questo sito utilizza esclusivamente cookie tecnici e analitici anonimi per garantire la migliore esperienza di navigazione.
                <SmartLink href="/privacy" className="text-primary font-medium hover:underline ml-1">
                  Leggi l'informativa privacy
                </SmartLink>.
              </div>
              <div className="flex gap-4 w-full md:w-auto shrink-0">
                <button
                  onClick={acceptCookies}
                  className="w-full md:w-auto px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:bg-[#AF4621] transition-colors shadow-sm"
                >
                  Accetta e Prosegui
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
