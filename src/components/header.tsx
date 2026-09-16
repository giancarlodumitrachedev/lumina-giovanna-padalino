"use client";

import { SmartLink } from "./smart-link";
import { 
  Menu, 
  MessageCircle, 
  Calendar, 
  Home, 
  UserRound, 
  Sparkles, 
  BookOpen, 
  PhoneCall, 
  ChevronRight, 
  ArrowRight, 
  MapPin, 
  X 
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";

const desktopNavLinks = [
  { href: "/", label: "Home" },
  { href: "/chi-sono", label: "Chi Sono" },
  { href: "/servizi", label: "Servizi" },
  { href: "/blog", label: "Blog" },
  { href: "/contatti", label: "Contatti" },
];

const mobileNavItems = [
  { 
    href: "/", 
    label: "Home", 
    subtitle: "Accoglienza & Filosofia dello studio",
    icon: Home 
  },
  { 
    href: "/chi-sono", 
    label: "Chi Sono", 
    subtitle: "Biografia, approccio Kintsugi & Albo",
    icon: UserRound 
  },
  { 
    href: "/servizi", 
    label: "Servizi Clinici", 
    subtitle: "Consulenze individuali, coppie & DSA",
    icon: Sparkles 
  },
  { 
    href: "/blog", 
    label: "Blog & Risorse", 
    subtitle: "Articoli, approfondimenti & ascolto",
    icon: BookOpen 
  },
  { 
    href: "/contatti", 
    label: "Contatti & Sede", 
    subtitle: "Studio a Bologna & Sedute online",
    icon: PhoneCall 
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

        {/* Desktop Nav - Original Clean Layout */}
        <nav className="hidden md:flex gap-5 lg:gap-6 items-center">
          {desktopNavLinks.map((link) => (
            <SmartLink
              key={link.href}
              href={link.href}
              className="text-[#2C1E16]/85 hover:text-primary font-medium text-[15px] tracking-wide transition-all py-1 hover:border-b-2 hover:border-primary whitespace-nowrap"
            >
              {link.label}
            </SmartLink>
          ))}
          
          {/* Quick MioDottore link */}
          <a
            href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#EADBCB] text-[#2C1E16] hover:bg-[#DFCDBB] transition-all border border-[#DFCEBA] whitespace-nowrap"
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
            className="bg-primary hover:bg-[#AF4621] text-white px-5 py-2.5 rounded-full text-[14px] font-medium transition-all shadow-sm hover:shadow terracotta-glow whitespace-nowrap"
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
              render={
                <button 
                  className="p-2 -mr-1 text-[#2C1E16] hover:text-primary transition-colors focus:outline-none" 
                  aria-label="Apri menu di navigazione" 
                />
              }
            >
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent 
              side="right" 
              showCloseButton={false}
              className="bg-[#F7EFE6] border-l border-[#DFCEBA] w-[90vw] max-w-[385px] p-0 gap-0 flex flex-col h-full overflow-hidden shadow-2xl"
            >
              <SheetDescription className="sr-only">
                Menu principale di navigazione dello studio di psicologia
              </SheetDescription>

              {/* Decorative Subtle Autumn Branch in Top-Right Background */}
              <div className="absolute -top-4 -right-4 w-32 h-32 opacity-10 pointer-events-none select-none z-0">
                <AutumnBranch className="w-full h-full" flipped={true} />
              </div>

              {/* Drawer Header with Title & Close Button */}
              <div className="relative z-10 px-4.5 py-3 border-b border-[#DFCEBA]/70 bg-[#F5EBE1]/70 backdrop-blur-xs flex items-center justify-between">
                <div className="pr-2">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9.5px] font-semibold tracking-wider uppercase bg-[#EADBCB]/80 text-[#8C5332] border border-[#DFCEBA]/80 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32]" />
                    Studio Clinico & Pedagogico
                  </div>
                  <SheetTitle className="font-heading italic font-bold text-[18px] min-[380px]:text-[19px] text-[#2C1E16] leading-tight block">
                    Dott.ssa Giovanna Padalino
                  </SheetTitle>
                  <p className="text-[11px] text-[#735948] mt-0.5 font-sans">
                    Psicologa Clinica • Bologna & Online
                  </p>
                </div>
                <SheetClose
                  render={
                    <button
                      type="button"
                      className="w-8 h-8 shrink-0 rounded-full bg-[#EADBCB]/80 hover:bg-[#DFCEBA] text-[#2C1E16] flex items-center justify-center transition-colors border border-[#DFCEBA] focus:outline-none shadow-2xs"
                      aria-label="Chiudi menu"
                    />
                  }
                >
                  <X className="w-4 h-4" />
                </SheetClose>
              </div>

              {/* Kintsugi Gold Hairline Divider */}
              <div className="kintsugi-line opacity-80" />

              {/* Scrollable Content Area */}
              <div className="relative z-10 flex-1 overflow-y-auto px-4.5 py-3 space-y-3.5 scroll-smooth">
                {/* Navigation Links */}
                <div>
                  <span className="text-[10px] font-bold tracking-wider uppercase text-[#735948]/90 px-1 block mb-1.5">
                    Navigazione
                  </span>
                  <nav className="flex flex-col gap-1">
                    {mobileNavItems.map((item) => {
                      const Icon = item.icon;
                      const isActive =
                        pathname === item.href ||
                        (item.href !== "/" && pathname.startsWith(item.href));

                      return (
                        <SmartLink
                          key={item.href}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className={`group flex items-center justify-between p-2 rounded-xl transition-all ${
                            isActive
                              ? "bg-[#EADBCB] text-primary font-semibold shadow-2xs border border-[#D4AF37]/35"
                              : "text-[#2C1E16] hover:bg-[#EADBCB]/50 hover:text-primary border border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
                                isActive
                                  ? "bg-primary text-white shadow-2xs"
                                  : "bg-[#EADBCB]/60 text-[#735948] group-hover:bg-primary/15 group-hover:text-primary"
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="text-left">
                              <span
                                className={`font-heading text-[14.5px] block leading-tight ${
                                  isActive ? "text-primary font-bold italic" : "text-[#2C1E16] group-hover:text-primary"
                                }`}
                              >
                                {item.label}
                              </span>
                              <span className="text-[10.5px] text-[#735948] font-sans font-normal block leading-tight mt-0.5">
                                {item.subtitle}
                              </span>
                            </div>
                          </div>
                          <ChevronRight
                            className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 shrink-0 ${
                              isActive ? "text-primary" : "text-[#DFCEBA] group-hover:text-primary"
                            }`}
                          />
                        </SmartLink>
                      );
                    })}
                  </nav>
                </div>

                {/* Direct Channels (WhatsApp, MioDottore, Instagram) */}
                <div className="pt-0.5">
                  <div className="flex items-center justify-between px-1 mb-1.5">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-[#735948]/90">
                      Canali Diretti
                    </span>
                    <span className="text-[9.5px] text-emerald-800 bg-emerald-100/75 border border-emerald-300/60 px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      Disponibile
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5">
                    {/* WhatsApp */}
                    <a
                      href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20vorrei%20richiedere%20informazioni%20per%20un%20appuntamento."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#FCFAF6] hover:bg-white border border-[#DFCEBA]/80 transition-all shadow-2xs group text-center"
                    >
                      <div className="w-7 h-7 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                        <MessageCircle className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11.5px] font-medium text-[#2C1E16] leading-tight">WhatsApp</span>
                      <span className="text-[9px] text-[#735948]">Scrivi</span>
                    </a>

                    {/* MioDottore */}
                    <a
                      href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#FCFAF6] hover:bg-white border border-[#DFCEBA]/80 transition-all shadow-2xs group text-center"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#F5EBE1] border border-[#DFCEBA]/80 text-[#C85A32] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                        <Calendar className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11.5px] font-medium text-[#2C1E16] leading-tight">MioDottore</span>
                      <span className="text-[9px] text-[#735948]">Agenda</span>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://www.instagram.com/gvpadalino.psicologa/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#FCFAF6] hover:bg-white border border-[#DFCEBA]/80 transition-all shadow-2xs group text-center"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#F5EBE1] border border-[#DFCEBA]/80 text-[#9E3E26] flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
                        <InstagramIcon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[11.5px] font-medium text-[#2C1E16] leading-tight">Instagram</span>
                      <span className="text-[9px] text-[#735948]">@gvpadalino</span>
                    </a>
                  </div>
                </div>

                {/* Studio Info / Badge */}
                <div className="p-2.5 rounded-xl bg-[#EADBCB]/45 border border-[#DFCEBA]/70 text-xs space-y-0.5">
                  <div className="flex items-center gap-2 text-[#2C1E16] font-medium">
                    <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                    <span className="text-[11.5px]">Studio a Bologna • Via della Beverara</span>
                  </div>
                  <p className="text-[10.5px] text-[#735948] pl-5.5 leading-snug">
                    In presenza il Venerdì • Sedute online Lunedì–Giovedì
                  </p>
                </div>
              </div>

              {/* Bottom Sticky Action / Footer */}
              <div className="relative z-10 p-4 pt-2.5 border-t border-[#DFCEBA]/70 bg-[#F5EBE1]/95 backdrop-blur-xs space-y-2">
                <SmartLink
                  href="/contatti"
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-primary hover:bg-[#AF4621] text-white font-medium text-[14.5px] shadow-md terracotta-glow transition-all active:scale-[0.99] group"
                >
                  <span>Prenota un consulto</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </SmartLink>

                <div className="flex items-center justify-between text-[10px] text-[#735948] px-0.5 pt-0.5 border-t border-[#DFCEBA]/40">
                  <span>Albo Psicologi E-R n. 12479</span>
                  <a
                    href="https://www.luminadigital.it"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#8C6D58] hover:text-primary font-medium transition-colors"
                  >
                    Powered by Lumina™
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
