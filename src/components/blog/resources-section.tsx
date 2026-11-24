"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ClinicalResource } from "@/lib/resources-data";
import { ResourceDownloadModal } from "@/components/blog/resource-download-modal";
import { ResourcePreviewModal } from "@/components/blog/resource-preview-modal";
import {
  Download,
  Eye,
  FileText,
  Image as ImageIcon,
  Users,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";

export function ResourcesSection({
  resources,
}: {
  resources: ClinicalResource[];
}) {
  const [filterType, setFilterType] = useState<"all" | "pdf" | "image">("all");
  const [downloadResource, setDownloadResource] =
    useState<ClinicalResource | null>(null);
  const [previewResource, setPreviewResource] =
    useState<ClinicalResource | null>(null);

  const hasMultipleTypes = useMemo(() => {
    const types = new Set(resources.map((r) => r.fileType));
    return types.size > 1;
  }, [resources]);

  const filteredResources = useMemo(() => {
    if (filterType === "all") return resources;
    return resources.filter((r) => r.fileType === filterType);
  }, [resources, filterType]);

  return (
    <div className="w-full space-y-10">
      {/* Introduzione calda ed editoriale */}
      <div className="max-w-2xl mx-auto text-center space-y-3">
        <p className="text-sm sm:text-base text-[#5C4436] leading-relaxed">
          Qui raccolgo schede visive, mappe e piccoli strumenti psicologici ed
          educativi che realizzo per il lavoro clinico e pedagogico. Sono
          gratuiti e pensati per essere scaricati e utilizzati liberamente —
          anche da colleghi, insegnanti e famiglie.
        </p>

        {hasMultipleTypes && (
          <div className="flex items-center justify-center gap-2 pt-2">
            {(
              [
                { value: "all", label: "Tutti i formati" },
                { value: "pdf", label: "PDF stampabili" },
                { value: "image", label: "Immagini" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setFilterType(opt.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterType === opt.value
                    ? "bg-[#C85A32] text-white shadow-sm"
                    : "bg-white text-[#5C4436] border border-[#E8DDCF] hover:bg-[#FAF6F0]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredResources.length === 0 ? (
        <div className="text-center py-14 bg-white/95 rounded-3xl border border-[#E8DDCF] p-8 max-w-md mx-auto">
          <p className="font-heading text-lg text-[#2C1E16] mb-1">
            Nessuno strumento trovato
          </p>
          <p className="text-xs text-[#8C6D58]">
            Nuove schede e strumenti saranno disponibili a breve.
          </p>
        </div>
      ) : filteredResources.length === 1 ? (
        /* Layout Editoriale In Evidenza quando è presente 1 scheda */
        (() => {
          const item = filteredResources[0];
          return (
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="max-w-5xl mx-auto bg-white/95 rounded-3xl border border-[#DFCEBA] shadow-sm overflow-hidden"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Colonna sinistra: Scheda reale su tappetino carta calda */}
                <div className="lg:col-span-6 bg-[#EFE3D4]/70 p-6 sm:p-8 md:p-10 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-[#DFCEBA]/70 relative group">
                  <button
                    type="button"
                    onClick={() => setPreviewResource(item)}
                    className="relative w-full max-w-[380px] aspect-square rounded-2xl overflow-hidden bg-[#FAF6F0] shadow-md border border-[#DFCEBA] transition-transform duration-500 group-hover:scale-[1.015] focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                    aria-label={`Apri anteprima ingrandita di ${item.title}`}
                  >
                    {item.previewImageUrl ? (
                      <Image
                        src={item.previewImageUrl}
                        alt={`Anteprima dello strumento ${item.title}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 90vw, 420px"
                        priority
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-[#8C6D58]">
                        <FileText className="w-12 h-12 text-[#C85A32]" />
                        <span className="text-xs font-medium">
                          {item.fileName}
                        </span>
                      </div>
                    )}
                    <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2C1E16]/80 backdrop-blur-xs text-[#FAF6F0] text-[11px] font-medium shadow-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Ingrandisci</span>
                    </span>
                  </button>
                </div>

                {/* Colonna destra: Dettagli editoriali & Download */}
                <div className="lg:col-span-6 p-7 sm:p-9 md:p-10 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#F5EFEB] text-[#C85A32] border border-[#E8DDCF]">
                        {item.fileType === "pdf" ? (
                          <FileText className="w-3.5 h-3.5" />
                        ) : (
                          <ImageIcon className="w-3.5 h-3.5" />
                        )}
                        <span>
                          {item.fileType === "pdf"
                            ? "PDF stampabile"
                            : "Immagine"}
                        </span>
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#FAF6F0] text-[#735948] border border-[#E8DDCF]">
                        {item.category}
                      </span>
                      <span className="text-xs text-[#8C6D58]">
                        • {item.fileSizeLabel}
                      </span>
                    </div>

                    <div>
                      <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#2C1E16] leading-tight mb-3">
                        {item.title}
                      </h2>
                      <p className="text-sm sm:text-[15px] text-[#5C4436] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 space-y-2 border-t border-[#F0E4D5]">
                      <div className="flex items-start gap-2 text-xs text-[#735948]">
                        <Users className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-[#2C1E16]">
                            Pensato per:
                          </strong>{" "}
                          {item.targetAudience}
                        </span>
                      </div>
                      <div className="flex items-start gap-2 text-xs text-[#735948]">
                        <Sparkles className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                        <span>
                          Gratuito e pronto per la stampa o l&apos;utilizzo in
                          seduta e a casa.
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setDownloadResource(item)}
                      className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-[#C85A32] hover:bg-[#AF4621] text-white font-semibold text-sm transition-all shadow-md terracotta-glow"
                    >
                      <Download className="w-4 h-4" />
                      <span>Scarica gratuitamente</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPreviewResource(item)}
                      className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-full bg-[#FAF6F0] hover:bg-[#EADBCB]/70 text-[#2C1E16] font-medium text-sm border border-[#DFCEBA] transition-colors"
                    >
                      <Eye className="w-4 h-4 text-[#8C6D58]" />
                      <span>Anteprima</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })()
      ) : (
        /* Griglia Editoriale per 2+ strumenti */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResources.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-white/95 rounded-3xl border border-[#DFCEBA] shadow-xs hover:shadow-md hover:border-[#C85A32]/40 transition-all flex flex-col overflow-hidden group"
            >
              {/* Anteprima su carta calda */}
              <button
                type="button"
                onClick={() => setPreviewResource(item)}
                className="relative aspect-[4/3] w-full bg-[#EFE3D4]/65 border-b border-[#EFE4D6] p-4 flex items-center justify-center overflow-hidden focus:outline-none"
                aria-label={`Apri anteprima di ${item.title}`}
              >
                {item.previewImageUrl ? (
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-sm border border-[#DFCEBA]/80 bg-[#FAF6F0]">
                    <Image
                      src={item.previewImageUrl}
                      alt={item.title}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 text-[#8C6D58]">
                    <FileText className="w-10 h-10 text-[#C85A32]" />
                    <span className="text-xs font-medium">{item.fileName}</span>
                  </div>
                )}

                <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-[#C85A32] border border-[#DFCEBA] shadow-2xs">
                  {item.fileType === "pdf" ? (
                    <FileText className="w-3 h-3" />
                  ) : (
                    <ImageIcon className="w-3 h-3" />
                  )}
                  <span>{item.fileType === "pdf" ? "PDF" : "Immagine"}</span>
                </span>
              </button>

              {/* Contenuto card */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-5">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[11px] text-[#8C6D58]">
                    <span className="font-semibold text-[#C85A32] truncate">
                      {item.category}
                    </span>
                    <span className="shrink-0">{item.fileSizeLabel}</span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#2C1E16] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[#5C4436] leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F0E4D5] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDownloadResource(item)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#C85A32] hover:bg-[#AF4621] text-white font-semibold text-xs transition-colors shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Scarica</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewResource(item)}
                    className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl bg-[#FAF6F0] hover:bg-[#EADBCB]/70 text-[#2C1E16] font-medium text-xs border border-[#DFCEBA] transition-colors"
                    aria-label={`Anteprima di ${item.title}`}
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8C6D58]" />
                    <span>Anteprima</span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* Nota finale per colleghi */}
      <div className="max-w-3xl mx-auto pt-4">
        <div className="kintsugi-line w-48 mx-auto mb-5 opacity-75" />
        <p className="text-center text-xs sm:text-[13px] text-[#735948] leading-relaxed">
          Tutti i materiali di questa raccolta sono realizzati dalla Dott.ssa
          Giovanna V. Padalino e messi a disposizione gratuitamente per
          favorire la condivisione tra colleghi, educatori, scuole e famiglie.
        </p>
      </div>

      {/* Modali nativi <dialog> */}
      <ResourceDownloadModal
        resource={downloadResource}
        onClose={() => setDownloadResource(null)}
        sourceType="blog_catalog"
      />
      <ResourcePreviewModal
        resource={previewResource}
        onClose={() => setPreviewResource(null)}
        onRequestDownload={(res) => setDownloadResource(res)}
      />
    </div>
  );
}
