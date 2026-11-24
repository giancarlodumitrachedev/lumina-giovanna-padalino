"use client";

import { useState } from "react";
import Image from "next/image";
import { ClinicalResource } from "@/lib/resources-data";
import { ResourceDownloadModal } from "@/components/blog/resource-download-modal";
import { ResourcePreviewModal } from "@/components/blog/resource-preview-modal";
import { Download, Eye, FileText, Image as ImageIcon } from "lucide-react";

interface ArticleResourceBoxProps {
  resource: ClinicalResource;
  postSlug: string;
}

export function ArticleResourceBox({
  resource,
  postSlug,
}: ArticleResourceBoxProps) {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <>
      <aside className="mt-10 rounded-2xl sm:rounded-3xl bg-[#F7EFE6] border border-[#DFCEBA] p-5 sm:p-7">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          {/* Miniatura reale della scheda */}
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-white border border-[#DFCEBA] shadow-xs shrink-0 group focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
            aria-label={`Anteprima di ${resource.title}`}
          >
            {resource.previewImageUrl ? (
              <Image
                src={resource.previewImageUrl}
                alt={resource.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="128px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#C85A32]">
                {resource.fileType === "pdf" ? (
                  <FileText className="w-9 h-9" />
                ) : (
                  <ImageIcon className="w-9 h-9" />
                )}
              </div>
            )}
          </button>

          {/* Testi & Azioni */}
          <div className="flex-1 text-center sm:text-left space-y-2.5">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white text-[#C85A32] border border-[#DFCEBA]">
                {resource.fileType === "pdf" ? (
                  <FileText className="w-3 h-3" />
                ) : (
                  <ImageIcon className="w-3 h-3" />
                )}
                <span>Strumento scaricabile gratuito</span>
              </span>
              <span className="text-[11px] text-[#8C6D58]">
                {resource.fileType === "pdf" ? "PDF" : "Immagine"} •{" "}
                {resource.fileSizeLabel}
              </span>
            </div>

            <h3 className="font-heading font-bold text-xl text-[#2C1E16] leading-snug">
              {resource.title}
            </h3>

            <p className="text-sm text-[#5C4436] leading-relaxed">
              {resource.description}
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setDownloadOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#C85A32] hover:bg-[#AF4621] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm terracotta-glow"
              >
                <Download className="w-4 h-4" />
                <span>
                  Scarica{" "}
                  {resource.fileType === "pdf" ? "il PDF" : "l'immagine"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#FAF6F0] text-[#2C1E16] text-xs font-semibold border border-[#DFCEBA] transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-[#8C6D58]" />
                <span>Anteprima</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      <ResourceDownloadModal
        resource={downloadOpen ? resource : null}
        onClose={() => setDownloadOpen(false)}
        sourceType="blog_article"
        sourcePostSlug={postSlug}
      />
      <ResourcePreviewModal
        resource={previewOpen ? resource : null}
        onClose={() => setPreviewOpen(false)}
        onRequestDownload={() => setDownloadOpen(true)}
      />
    </>
  );
}
