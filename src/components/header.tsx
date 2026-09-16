"use client";

import { SmartLink } from "./smart-link";
import { Menu, MessageCircle, Calendar } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/chi-sono", label: "Chi Sono" },
  { href: "/servizi", label: "Servizi" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-[#F5EBE1]/95 backdrop-blur-md shadow-sm border-b border-[#DFCEBA] h-16 md:h-20" 
          : "bg-[#F5EBE1]/85 backdrop-blur-sm h-20 md:h-24"
      }`}
    >
      <div className="max-w-7xl mx-auto flex h-full items-center justify-between px-3 sm:px-6 transition-all duration-300">
        {/* Logo / Brand with Corsivo / Italic - Full Visibility with zero clipping */}
        <SmartLink href="/" className="flex items-center gap-2 group shrink min-w-0 pr-1 overflow-visible">
          <div className="flex flex-col overflow-visible">
            <span className="font-heading italic font-bold text-[15px] min-[360px]:text-[16.5px] min-[400px]:text-[18px] sm:text-xl md:text-2xl tracking-tight text-[#2C1E16] group-hover:text-primary transition-colors whitespace-nowrap overflow-visible pr-2.5 pb-0.5">
              Dott.ssa Giovanna Padalino
            </span>
            <span className="text-[10px] sm:text-[11px] md:text-xs uppercase tracking-wider text-muted-foreground font-sans whitespace-nowrap overflow-visible">
              <span className="inline sm:hidden">Psicologa Clinica • Bologna</span>
              <span className="hidden sm:inline">Psicologa Clinica & Pedagogista • Bologna</span>
            </span>
          </div>
        </SmartLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              className="text-[#2C1E16]/85 hover:text-primary font-medium text-[15px] tracking-wide transition-all py-1 hover:border-b-2 hover:border-primary"
            >
              {link.label}
            </SmartLink>
          ))}
          
          {/* Quick MioDottore link */}
          <a
            href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EADBCB] text-[#2C1E16] hover:bg-[#DFCDBB] transition-all border border-[#DFCEBA]"
            title="Prenota su MioDottore"
          >
            <Calendar className="w-3.5 h-3.5 text-primary" />
            <span>MioDottore</span>
          </a>

          {/* Instagram Link */}
          <a
            href="https://www.instagram.com/gvpadalino.psicologa/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[#9E3E26] hover:text-[#C85A32] transition-colors p-1"
            title="Seguimi su Instagram (@gvpadalino.psicologa)"
          >
            <InstagramIcon className="w-4 h-4" />
          </a>

          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20vorrei%20richiedere%20informazioni%20per%20un%20appuntamento."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-emerald-700 hover:text-emerald-800 transition-colors p-1"
            title="Scrivimi su WhatsApp (+39 349 267 9598)"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
          </a>

          <SmartLink
            href="/contatti"
            className="bg-primary hover:bg-[#AF4621] text-white px-5 py-2.5 rounded-full text-[14px] font-medium transition-all shadow-sm hover:shadow terracotta-glow"
          >
            Prenota un consulto
          </SmartLink>
        </nav>

        {/* Mobile Nav: Clean, Compact, Zero Overflow */}
        <div className="md:hidden flex items-center gap-1.5 shrink-0">
          <a
            href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20vorrei%20richiedere%20informazioni%20per%20un%20appuntamento."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-emerald-700 hover:text-emerald-800 bg-emerald-50/90 rounded-full border border-emerald-200/70 transition-colors focus:outline-none flex items-center justify-center"
            aria-label="WhatsApp"
            title="Scrivi su WhatsApp"
          >
            <MessageCircle className="h-4.5 w-4.5 text-emerald-600" />
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={<button className="p-2 -mr-1 text-[#2C1E16] hover:text-primary transition-colors focus:outline-none" aria-label="Menu" />}
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-[#F5EBE1] border-border w-full sm:w-[380px]">
              <SheetTitle className="sr-only">Menu di Navigazione</SheetTitle>
              <div className="flex flex-col justify-between h-full pt-8 pb-12">
                <div className="flex flex-col gap-6">
                  <div className="border-b border-[#DFCEBA] pb-4">
                    <span className="font-heading italic font-bold text-xl text-[#2C1E16]">
                      Dott.ssa Giovanna Padalino
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">Bologna & Online</p>
                  </div>
                  {navLinks.map((link) => (
                    <SmartLink
                      key={link.href}
                      href={link.href}
                      className="text-xl font-heading font-medium text-foreground hover:text-primary transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </SmartLink>
                  ))}
                  
                  <div className="pt-4 flex flex-col gap-3">
                    <a
                      href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-primary/40 text-primary font-medium text-sm bg-white/70"
                    >
                      <Calendar className="w-4 h-4" />
                      Prenota su MioDottore
                    </a>
                    <a
                      href="https://www.instagram.com/gvpadalino.psicologa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#9E3E26] text-white font-medium text-sm shadow"
                    >
                      <InstagramIcon className="w-4 h-4" />
                      Profilo Instagram
                    </a>
                    <a
                      href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20vorrei%20richiedere%20informazioni%20per%20un%20appuntamento."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 text-white font-medium text-sm shadow"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contatta su WhatsApp
                    </a>
                  </div>
                </div>

                <div>
                  <SmartLink
                    href="/contatti"
                    onClick={() => setOpen(false)}
                    className="block bg-primary text-primary-foreground hover:bg-[#AF4621] px-6 py-3.5 rounded-xl text-center font-medium shadow-md w-full"
                  >
                    Prenota un consulto
                  </SmartLink>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
