"use client";

import { useRouter } from "next/navigation";
import { DBPost } from "@/lib/blog-service";
import { DBResource, DownloadAnalyticsSummary } from "@/lib/resources-data";
import { AdminPostList } from "@/components/admin/post-list";
import { AdminResourceList } from "@/components/admin/resource-list";
import { AdminDownloadAnalytics } from "@/components/admin/download-analytics";
import { FileText, FileDown, BarChart3 } from "lucide-react";

export type AdminTabKey = "articoli" | "strumenti" | "statistiche";

interface AdminDashboardTabsProps {
  activeTab: AdminTabKey;
  posts: DBPost[];
  resources: DBResource[];
  resourcesTablesReady: boolean;
  analytics: DownloadAnalyticsSummary;
  selectedDays: "7" | "30" | "all";
  selectedResourceId: string;
}

export function AdminDashboardTabs({
  activeTab,
  posts,
  resources,
  resourcesTablesReady,
  analytics,
  selectedDays,
  selectedResourceId,
}: AdminDashboardTabsProps) {
  const router = useRouter();

  const handleSelectTab = (tab: AdminTabKey) => {
    if (tab === "articoli") {
      router.push("/admin");
    } else {
      router.push(`/admin?tab=${tab}`);
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
            {analytics.totalDownloads}
          </span>
        </button>
      </div>

      {/* Pannello attivo */}
      <div
        role="tabpanel"
        aria-labelledby={`admin-tab-${activeTab}`}
      >
        {activeTab === "articoli" && <AdminPostList initialPosts={posts} />}

        {activeTab === "strumenti" && (
          <AdminResourceList
            initialResources={resources}
            tablesReady={resourcesTablesReady}
          />
        )}

        {activeTab === "statistiche" && (
          <AdminDownloadAnalytics
            analytics={analytics}
            resources={resources}
            selectedDays={selectedDays}
            selectedResourceId={selectedResourceId}
          />
        )}
      </div>
    </div>
  );
}
