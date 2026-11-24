"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { BlogPost } from "@/lib/blog-data";
import { ClinicalResource } from "@/lib/resources-data";
import { BlogFeed } from "@/components/blog/blog-feed";
import { ResourcesSection } from "@/components/blog/resources-section";
import { BookOpen, FileDown, ArrowRight } from "lucide-react";

interface BlogHubProps {
  posts: BlogPost[];
  resources: ClinicalResource[];
  initialSection: "articoli" | "strumenti";
}

export function BlogHub({ posts, resources, initialSection }: BlogHubProps) {
  const [activeTab, setActiveTab] = useState<"articoli" | "strumenti">(
    initialSection
  );
  const articoliTabRef = useRef<HTMLButtonElement>(null);
  const strumentiTabRef = useRef<HTMLButtonElement>(null);

  const featuredResource = resources[0] || null;

  const switchTab = (next: "articoli" | "strumenti") => {
    setActiveTab(next);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (next === "strumenti") {
        url.searchParams.set("sezione", "strumenti");
      } else {
        url.searchParams.delete("sezione");
      }
      window.history.replaceState(null, "", url.pathname + url.search);
    }
  };

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      const next = activeTab === "articoli" ? "strumenti" : "articoli";
      switchTab(next);
      if (next === "articoli") {
        articoliTabRef.current?.focus();
      } else {
        strumentiTabRef.current?.focus();
      }
    }
  };

  return (
    <div className="w-full space-y-10">
      {/* Selettore editoriale integrato (Articoli | Strumenti & Schede) */}
      <div className="flex justify-center">
        <div
          role="tablist"
          aria-label="Sezioni del blog Spazio Accogliente"
          onKeyDown={handleTabKeyDown}
          className="inline-flex items-center bg-[#EADBCB]/65 p-1.5 rounded-full border border-[#DFCEBA] shadow-2xs overflow-x-auto max-w-full"
        >
          <button
            ref={articoliTabRef}
            id="tab-articoli"
            type="button"
            role="tab"
            aria-selected={activeTab === "articoli"}
            tabIndex={activeTab === "articoli" ? 0 : -1}
            onClick={() => switchTab("articoli")}
            className={`editorial-tab flex-none inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "articoli"
                ? "bg-white text-[#2C1E16] shadow-xs"
                : "text-[#6B5547] hover:text-[#2C1E16]"
            }`}
          >
            <BookOpen className="w-4 h-4 text-[#C85A32]" />
            <span>Articoli</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F5EBE1] text-[#735948]">
              {posts.length}
            </span>
          </button>

          <button
            ref={strumentiTabRef}
            id="tab-strumenti"
            type="button"
            role="tab"
            aria-selected={activeTab === "strumenti"}
            tabIndex={activeTab === "strumenti" ? 0 : -1}
            onClick={() => switchTab("strumenti")}
            className={`editorial-tab flex-none inline-flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === "strumenti"
                ? "bg-white text-[#2C1E16] shadow-xs"
                : "text-[#6B5547] hover:text-[#2C1E16]"
            }`}
          >
            <FileDown className="w-4 h-4 text-[#C85A32]" />
            <span>Strumenti &amp; Schede</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F5EBE1] text-[#735948]">
              {resources.length}
            </span>
          </button>
        </div>
      </div>

      {/* Pannello Articoli */}
      <div
        role="tabpanel"
        aria-labelledby="tab-articoli"
        hidden={activeTab !== "articoli"}
      >
        <div className="space-y-10">
          {/* Discreto richiamo editoriale allo strumento gratuito */}
          {featuredResource && (
            <div className="max-w-4xl mx-auto bg-[#FCFAF6] rounded-2xl sm:rounded-3xl border border-[#DFCEBA] p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
              {featuredResource.previewImageUrl && (
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#DFCEBA] bg-[#F5EBE1] shrink-0 shadow-2xs">
                  <Image
                    src={featuredResource.previewImageUrl}
                    alt={featuredResource.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </div>
              )}

              <div className="flex-1 text-center sm:text-left min-w-0">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C85A32] block mb-0.5">
                  Strumento gratuito scaricabile •{" "}
                  {featuredResource.fileType === "pdf" ? "PDF" : "Immagine"}
                </span>
                <p className="font-heading font-bold text-base sm:text-lg text-[#2C1E16] leading-snug">
                  {featuredResource.title}
                </p>
                <p className="text-xs text-[#6B5547] line-clamp-1 mt-0.5">
                  Schede pratiche e strumenti clinici gratuiti per colleghi,
                  famiglie e uso personale.
                </p>
              </div>

              <button
                type="button"
                onClick={() => switchTab("strumenti")}
                className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-[#EADBCB]/80 hover:bg-[#C85A32] text-[#2C1E16] hover:text-white text-xs font-semibold border border-[#DFCEBA] hover:border-transparent transition-all group"
              >
                <span>Esplora gli strumenti</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          )}

          <BlogFeed posts={posts} />
        </div>
      </div>

      {/* Pannello Strumenti & Schede */}
      <div
        role="tabpanel"
        aria-labelledby="tab-strumenti"
        hidden={activeTab !== "strumenti"}
      >
        <ResourcesSection resources={resources} />
      </div>
    </div>
  );
}
