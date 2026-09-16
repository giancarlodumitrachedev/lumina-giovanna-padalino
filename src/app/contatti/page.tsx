import { ContactForm } from "@/components/contact-form";
import { getDemoParams } from "@/lib/demo-params";
import { MapPin, Phone, Mail, Clock, MessageCircle, Calendar, Sparkles } from "lucide-react";
import { FacebookIcon } from "@/components/icons/facebook-icon";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";

export const metadata = {
  title: "Contatti & Prenotazioni | Dott.ssa Giovanna Padalino - Psicologa a Bologna",
  description: "Contatta la Dott.ssa Giovanna Padalino per informazioni o per fissare un colloquio a Bologna o online. Orari: online lun-gio 17-21, studio ven 14-21.",
};

export default async function ContattiPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await getDemoParams(searchParams);

  return (
    <div className="py-16 md:py-24 bg-[#F5EBE1] min-h-screen relative overflow-hidden">
      {/* Decorative Autumn foliage in background */}
      <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 pointer-events-none z-0">
        <AutumnBranch className="w-48 h-56 opacity-60" flipped />
      </div>
      <div className="absolute bottom-10 left-0 -translate-x-8 pointer-events-none z-0">
        <AutumnBranch className="w-44 h-52 opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-[#EADBCB] text-[#5C2A14] text-xs font-semibold mb-4 tracking-wide uppercase border border-[#DFCEBA]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>Prenotazioni & Informazioni</span>
          </div>
          <h1 className="text-[#2C1E16] font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Prendi contatto con lo studio
          </h1>
          <p className="text-base sm:text-lg text-[#6B5547] leading-relaxed">
            Sono a tua disposizione per accogliere le tue domande, fornirti informazioni dettagliate sui percorsi o concordare un primo colloquio in presenza a Bologna o online.
          </p>
        </div>

        {/* Quick Action Cards (WhatsApp, MioDottore, Instagram, Facebook) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* WhatsApp Card */}
          <a
            href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20vorrei%20richiedere%20informazioni%20per%20un%20appuntamento."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/95 p-6 rounded-3xl border border-[#DFCEBA] shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#2C1E16] mb-1">
                WhatsApp Diretto
              </h3>
              <p className="text-xs text-[#735948] mb-3">
                Risposta rapida e confidenziale per fissare o richiedere info.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F0E4D5] flex items-center justify-between text-xs font-semibold text-emerald-700">
              <span>+39 349 267 9598</span>
              <span className="group-hover:translate-x-1 transition-transform">Scrivi →</span>
            </div>
          </a>

          {/* MioDottore Card */}
          <a
            href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/95 p-6 rounded-3xl border border-[#DFCEBA] shadow-sm hover:shadow-md hover:border-[#C85A32]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#EADBCB] text-[#C85A32] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#2C1E16] mb-1">
                Agenda MioDottore
              </h3>
              <p className="text-xs text-[#735948] mb-3">
                Scegli giorno e orario in tempo reale sul calendario ufficiale.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F0E4D5] flex items-center justify-between text-xs font-semibold text-[#C85A32]">
              <span>Prenota online</span>
              <span className="group-hover:translate-x-1 transition-transform">Agenda →</span>
            </div>
          </a>

          {/* Instagram Card */}
          <a
            href="https://www.instagram.com/gvpadalino.psicologa/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/95 p-6 rounded-3xl border border-[#DFCEBA] shadow-sm hover:shadow-md hover:border-[#C85A32]/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-amber-50 text-[#C85A32] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#2C1E16] mb-1">
                Instagram
              </h3>
              <p className="text-xs text-[#735948] mb-3">
                Riflessioni su neurodivergenze, crescita e benessere.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F0E4D5] flex items-center justify-between text-xs font-semibold text-[#C85A32]">
              <span>@gvpadalino.psicologa</span>
              <span className="group-hover:translate-x-1 transition-transform">Segui →</span>
            </div>
          </a>

          {/* Facebook Card */}
          <a
            href="https://www.facebook.com/gvpadalino.psicologa"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/95 p-6 rounded-3xl border border-[#DFCEBA] shadow-sm hover:shadow-md hover:border-blue-400/50 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <FacebookIcon className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#2C1E16] mb-1">
                Facebook
              </h3>
              <p className="text-xs text-[#735948] mb-3">
                Pagina professionale, approfondimenti ed eventi.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F0E4D5] flex items-center justify-between text-xs font-semibold text-blue-700">
              <span>@gvpadalino.psicologa</span>
              <span className="group-hover:translate-x-1 transition-transform">Visita →</span>
            </div>
          </a>
        </div>

        {/* Main Grid: Form & Studio Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          <div className="lg:col-span-6">
            <ContactForm />
          </div>

          <div className="lg:col-span-6 space-y-8 bg-white/95 p-8 md:p-10 rounded-3xl shadow-sm border border-[#DFCEBA]">
            <div>
              <h3 className="font-heading font-bold text-2xl text-[#2C1E16] mb-6">
                Orari e Informazioni sullo Studio
              </h3>

              <div className="space-y-6">
                {/* Sede */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#F5EBE1] text-[#C85A32] flex items-center justify-center shrink-0 border border-[#DFCEBA]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#2C1E16]">Sede di Ricevimento</h4>
                    <p className="text-sm text-[#5C4436] leading-relaxed">
                      Via della Beverara, 224/6 • Piano 2, 40100 Bologna (BO)
                    </p>
                    <p className="text-xs text-[#735948] mt-0.5">
                      Disponibile anche per percorsi e consulenze <strong>Online</strong>
                    </p>
                  </div>
                </div>

                {/* Orari Dettagliati */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#F5EBE1] text-[#C59B27] flex items-center justify-center shrink-0 border border-[#DFCEBA]">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="font-semibold text-base text-[#2C1E16]">Orari di Ricevimento</h4>
                    <div className="bg-[#FAF4ED] p-3 rounded-xl border border-[#DFCEBA] text-sm space-y-1">
                      <p className="text-[#3A281E]">
                        <strong className="text-[#C85A32]">Online:</strong> da Lunedì a Giovedì dalle <strong>17:00 alle 21:00</strong>
                      </p>
                      <p className="text-[#3A281E]">
                        <strong className="text-[#C85A32]">In Studio (Bologna):</strong> il Venerdì dalle <strong>14:00 alle 21:00</strong>
                      </p>
                    </div>
                    <p className="text-xs text-[#735948] italic">
                      Ricevimento esclusivamente su appuntamento
                    </p>
                  </div>
                </div>

                {/* Telefono */}
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-[#F5EBE1] text-[#C85A32] flex items-center justify-center shrink-0 border border-[#DFCEBA]">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base text-[#2C1E16]">Telefono & WhatsApp</h4>
                    <p className="text-sm text-[#5C4436]">
                      <a href="tel:+393492679598" className="hover:text-primary transition-colors font-semibold text-[#2C1E16]">
                        +39 349 267 9598
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps Iframe Section */}
            <div className="pt-4 border-t border-[#F0E4D5]">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-heading font-semibold text-lg text-[#2C1E16]">
                  Mappa dello Studio a Bologna
                </h4>
                <a
                  href="https://maps.google.com/?q=Via+della+Beverara+224/6+40100+Bologna+BO"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:text-[#AF4621] flex items-center gap-1 underline underline-offset-2"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Apri su Google Maps →</span>
                </a>
              </div>
              <div className="w-full h-64 rounded-2xl overflow-hidden border border-[#DFCEBA] shadow-inner relative bg-[#FAF4ED]">
                <iframe
                  title="Mappa dello studio Dott.ssa Giovanna Padalino Bologna"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Via%20della%20Beverara%20224%20Bologna&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="relative z-10 w-full h-full"
                />
              </div>
              <p className="text-[11px] text-[#8C6D58] mt-2">
                Zona Navile / Beverara • Facilmente raggiungibile con i mezzi pubblici (linea bus 30 e 11) o in auto con parcheggio nelle vicinanze.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
