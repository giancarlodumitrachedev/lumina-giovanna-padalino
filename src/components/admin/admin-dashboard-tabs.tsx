"use client";

import { useState } from "react";
import { DBPost } from "@/lib/blog-service";
import { DBResource, ResourceDownloadRecord } from "@/lib/resources-data";
import { AdminPostList } from "@/components/admin/post-list";
import { AdminResourceList } from "@/components/admin/resource-list";
import { AdminDownloadAnalytics } from "@/components/admin/download-analytics";
import { FileText, FileDown, BarChart3 } from "lucide-react";

export type AdminTabKey = "articoli" | "strumenti" | "statistiche";

interface AdminDashboardTabsProps {
  initialTab: AdminTabKey;
  posts: DBPost[];
  resources: DBResource[];
  resourcesTablesReady: boolean;
  rawDownloads: ResourceDownloadRecord[];
  downloadsTablesReady: boolean;
  initialDays: "7" | "30" | "all";
  initialResourceId: string;
}

export function AdminDashboardTabs({
  initialTab,
  posts,
  resources,
  resourcesTablesReady,
  rawDownloads,
  downloadsTablesReady,
  initialDays,
  initialResourceId,
}: AdminDashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<AdminTabKey>(initialTab);

  // Cambio tab istantaneo a 0ms senza round-trip al server (URL aggiornato con replaceState)
  const handleSelectTab = (tab: AdminTabKey) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "articoli") {
        url.searchParams.delete("tab");
        url.searchParams.delete("days");
        url.searchParams.delete("resourceId");
      } else {
        url.searchParams.set("tab", tab);
      }
      window.history.replaceState(null, "", url.pathname + url.search);
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigazione Tab del Portale */}
      <div
        role="tablist"
        aria-label="Sezioni del Portale Medico"
        className="flex items-center gap-1.5 bg-[#EADBCB]/65 p-1.5 rounded-2xl border border-[#DFCEBA] overflow-x-auto"
      >
        <button
          id="admin-tab-articoli"
          type="button"
          role="tab"
          aria-selected={activeTab === "articoli"}
          onClick={() => handleSelectTab("articoli")}
          className={`editorial-tab flex-none inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "articoli"
              ? "bg-white text-[#2C1E16] shadow-xs"
              : "text-[#6B5547] hover:text-[#2C1E16]"
          }`}
        >
          <FileText className="w-4 h-4 text-[#C85A32]" />
          <span>Articoli Blog</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F5EBE1] text-[#735948]">
            {posts.length}
          </span>
        </button>

        <button
          id="admin-tab-strumenti"
          type="button"
          role="tab"
          aria-selected={activeTab === "strumenti"}
          onClick={() => handleSelectTab("strumenti")}
          className={`editorial-tab flex-none inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
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

        <button
          id="admin-tab-statistiche"
          type="button"
          role="tab"
          aria-selected={activeTab === "statistiche"}
          onClick={() => handleSelectTab("statistiche")}
          className={`editorial-tab flex-none inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
            activeTab === "statistiche"
              ? "bg-white text-[#2C1E16] shadow-xs"
              : "text-[#6B5547] hover:text-[#2C1E16]"
          }`}
        >
          <BarChart3 className="w-4 h-4 text-[#C85A32]" />
          <span>Statistiche Download</span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#F5EBE1] text-[#735948]">
            {rawDownloads.length}
          </span>
        </button>
      </div>

      {/* Pannello attivo */}
      <div role="tabpanel" aria-labelledby={`admin-tab-${activeTab}`}>
        {activeTab === "articoli" && <AdminPostList initialPosts={posts} />}

        {activeTab === "strumenti" && (
          <AdminResourceList
            initialResources={resources}
            tablesReady={resourcesTablesReady}
          />
        )}

        {activeTab === "statistiche" && (
          <AdminDownloadAnalytics
            rawDownloads={rawDownloads}
            resources={resources}
            tablesReady={resourcesTablesReady && downloadsTablesReady}
            initialDays={initialDays}
            initialResourceId={initialResourceId}
          />
        )}
      </div>
    </div>
  );
}
