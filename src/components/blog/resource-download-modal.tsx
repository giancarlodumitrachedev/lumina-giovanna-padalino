"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import {
  ClinicalResource,
  DOWNLOADER_ROLES,
  DownloaderRole,
} from "@/lib/resources-data";
import { SmartLink } from "@/components/smart-link";
import {
  X,
  Download,
  Check,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  Loader2,
  ShieldCheck,
} from "lucide-react";

interface ResourceDownloadModalProps {
  resource: ClinicalResource | null;
  onClose: () => void;
  sourceType?: "blog_catalog" | "blog_article";
  sourcePostSlug?: string | null;
}

export function ResourceDownloadModal({
  resource,
  onClose,
  sourceType = "blog_catalog",
  sourcePostSlug = null,
}: ResourceDownloadModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressedOutsideRef = useRef(false);
  const titleId = useId();
  const emailId = useId();

  const [selectedRole, setSelectedRole] = useState<DownloaderRole | null>(null);
  const [email, setEmail] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedUrl, setCompletedUrl] = useState<string | null>(null);
  const [completedFilename, setCompletedFilename] = useState<string>("");

  // Apertura/chiusura nativa <dialog> con showModal()
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (resource) {
      setSelectedRole(null);
      setEmail("");
      setMarketingConsent(false);
      setError(null);
      setCompletedUrl(null);
      setCompletedFilename(resource.fileName);

      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [resource]);

  // Reset returnValue alla chiusura nativa (Esc, tasto chiusura, backdrop)
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  // Fallback light-dismiss per browser senza `closedby="any"` (es. Safari)
  const isPointerOutside = (
    e: React.PointerEvent<HTMLDialogElement>,
    dialog: HTMLDialogElement
  ) => {
    const rect = dialog.getBoundingClientRect();
    return (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    );
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      pressedOutsideRef.current = isPointerOutside(e, dialog);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (
      !("closedBy" in HTMLDialogElement.prototype) &&
      pressedOutsideRef.current &&
      isPointerOutside(e, dialog)
    ) {
      dialog.close();
    }
    pressedOutsideRef.current = false;
  };

  const triggerBrowserDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resource) return;

    if (!selectedRole) {
      setError("Seleziona una delle opzioni per avviare il download gratuito.");
      return;
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Controlla l'indirizzo email inserito, oppure lascialo vuoto.");
      return;
    }

    if (trimmedEmail && !marketingConsent) {
      setError(
        "Conferma il consenso privacy per lasciare la tua email, oppure svuota il campo per scaricare in forma anonima."
      );
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/resources/${encodeURIComponent(resource.id)}/download`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: selectedRole,
            email: trimmedEmail || undefined,
            marketingConsent: Boolean(trimmedEmail && marketingConsent),
            sourceType,
            sourcePostSlug,
            externalReferrer:
              typeof document !== "undefined" ? document.referrer : undefined,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || "Si è verificato un imprevisto. Riprova.");
        return;
      }

      const finalUrl = data.downloadUrl as string;
      const finalName = (data.fileName as string) || resource.fileName;

      setCompletedUrl(finalUrl);
      setCompletedFilename(finalName);
      triggerBrowserDownload(finalUrl, finalName);
    } catch {
      setError("Errore di connessione. Riprova tra qualche istante.");
    } finally {
      setSubmitting(false);
    }
  };

  const hasEmail = email.trim().length > 0;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...({ closedby: "any" } as Record<string, string>)}
      className="w-full max-w-lg rounded-3xl border border-[#DFCEBA] bg-[#FCFAF6] p-0 text-[#2C1E16] shadow-2xl overflow-y-auto"
    >
      {resource && (
        <div className="relative">
          {/* Linea dorata Kintsugi in testa */}
          <div className="kintsugi-line w-full" />

          {/* Pulsante chiusura accessibile */}
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Chiudi finestra di download"
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[#F5EBE1] hover:bg-[#EADBCB] text-[#5C4436] hover:text-[#2C1E16] flex items-center justify-center border border-[#DFCEBA] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 sm:p-8">
            {/* Intestazione con miniatura reale */}
            <div className="flex items-start gap-4 pr-10 mb-6">
              {resource.previewImageUrl ? (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#DFCEBA] bg-[#F5EBE1] shrink-0 shadow-xs">
                  <Image
                    src={resource.previewImageUrl}
                    alt={resource.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-[#EADBCB] border border-[#DFCEBA] flex items-center justify-center text-[#C85A32] shrink-0">
                  {resource.fileType === "pdf" ? (
                    <FileText className="w-7 h-7" />
                  ) : (
                    <ImageIcon className="w-7 h-7" />
                  )}
                </div>
              )}

              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#C85A32] mb-1">
                  <span>Strumento gratuito</span>
                  <span className="text-[#DFCEBA]">•</span>
                  <span>
                    {resource.fileType === "pdf" ? "PDF" : "Immagine"} (
                    {resource.fileSizeLabel})
                  </span>
                </span>
                <h1
                  id={titleId}
                  className="font-heading font-bold text-xl sm:text-2xl text-[#2C1E16] leading-snug"
                >
                  {resource.title}
                </h1>
              </div>
            </div>

            {completedUrl ? (
              /* Stato di conferma post-download */
              <div className="py-4 text-center space-y-5">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="space-y-1.5">
                  <h2 className="font-heading font-bold text-xl text-[#2C1E16]">
                    Download avviato
                  </h2>
                  <p className="text-sm text-[#5C4436] leading-relaxed max-w-sm mx-auto">
                    Grazie per aver scaricato <strong>{resource.title}</strong>.
                    Spero possa esserti uno strumento prezioso nel tuo lavoro o
                    percorso quotidiano.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={completedUrl}
                    download={completedFilename}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#C85A32] hover:bg-[#AF4621] text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Scarica di nuovo</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => dialogRef.current?.close()}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#F5EBE1] hover:bg-[#EADBCB] text-[#2C1E16] text-sm font-medium border border-[#DFCEBA] transition-colors"
                  >
                    Torna al blog
                  </button>
                </div>
              </div>
            ) : (
              /* Micro-form 1-tap Ruolo + Email facoltativa */
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <p className="text-sm text-[#5C4436] leading-relaxed">
                  Un ultimo piccolo gesto prima del download: mi aiuta a capire
                  chi utilizza questi materiali e a creare nuovi strumenti
                  davvero utili.
                </p>

                {/* Ruolo */}
                <fieldset className="space-y-2.5">
                  <legend className="text-xs font-semibold uppercase tracking-wider text-[#2C1E16] mb-2">
                    Come utilizzerai questo strumento? *
                  </legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {DOWNLOADER_ROLES.map((role) => {
                      const isSelected = selectedRole === role.value;
                      return (
                        <button
                          key={role.value}
                          type="button"
                          onClick={() => {
                            setSelectedRole(role.value);
                            setError(null);
                          }}
                          aria-pressed={isSelected}
                          className={`text-left px-3.5 py-2.5 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                            isSelected
                              ? "bg-[#EADBCB]/80 border-[#C85A32] text-[#2C1E16] ring-1 ring-[#C85A32]/30"
                              : "bg-white border-[#DFCEBA] text-[#5C4436] hover:bg-[#FAF6F0] hover:border-[#C85A32]/40"
                          }`}
                        >
                          <span className="block">
                            <span className="block text-xs sm:text-[13px] font-semibold text-[#2C1E16] leading-tight">
                              {role.label}
                            </span>
                            <span className="block text-[11px] text-[#735948] mt-0.5 leading-snug">
                              {role.description}
                            </span>
                          </span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isSelected
                                ? "bg-[#C85A32] border-[#C85A32] text-white"
                                : "border-[#DFCEBA] bg-[#FAF6F0]"
                            }`}
                          >
                            {isSelected && <Check className="w-2.5 h-2.5" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Email facoltativa */}
                <div className="pt-1 space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <label
                      htmlFor={emailId}
                      className="text-xs font-semibold uppercase tracking-wider text-[#2C1E16]"
                    >
                      La tua email{" "}
                      <span className="font-normal normal-case text-[#8C6D58]">
                        (facoltativa)
                      </span>
                    </label>
                  </div>
                  <input
                    id={emailId}
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="nome@esempio.it"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DFCEBA] text-sm text-[#2C1E16] placeholder:text-[#8C6D58]/55 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/35 focus:border-[#C85A32]"
                  />
                  <p className="text-[11px] text-[#735948] leading-relaxed">
                    Lasciala solo se desideri ricevere un avviso quando
                    pubblicherò nuovi strumenti gratuiti. Nessuna newsletter
                    invasiva.
                  </p>

                  {hasEmail && (
                    <label className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F5EBE1]/70 border border-[#DFCEBA] cursor-pointer mt-2">
                      <input
                        type="checkbox"
                        checked={marketingConsent}
                        onChange={(e) => {
                          setMarketingConsent(e.target.checked);
                          if (error) setError(null);
                        }}
                        className="mt-0.5 rounded border-[#C85A32] accent-[#C85A32]"
                      />
                      <span className="text-[11px] text-[#5C4436] leading-relaxed">
                        Acconsento a ricevere sporadici aggiornamenti sui nuovi
                        strumenti clinici e pedagogici della Dott.ssa Padalino,
                        secondo la{" "}
                        <SmartLink
                          href="/privacy"
                          className="underline text-[#C85A32] font-medium"
                        >
                          Privacy Policy
                        </SmartLink>
                        .
                      </span>
                    </label>
                  )}
                </div>

                {error && (
                  <div
                    role="alert"
                    className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs leading-relaxed"
                  >
                    {error}
                  </div>
                )}

                {/* CTA finale */}
                <div className="pt-2 space-y-2.5">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#C85A32] hover:bg-[#AF4621] text-white font-semibold text-sm transition-all shadow-md terracotta-glow disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Preparazione file...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>
                          Scarica{" "}
                          {resource.fileType === "pdf"
                            ? "il PDF gratuitamente"
                            : "l'immagine gratuitamente"}
                        </span>
                      </>
                    )}
                  </button>

                  <p className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C6D58]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>File verificato • Download immediato e gratuito</span>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
