import { verifyAdminSession, logoutAdminAction } from "@/app/actions/admin-blog";
import { getAllPostsAdmin } from "@/lib/blog-service";
import {
  getAllResourcesAdmin,
  getRawDownloadsAdmin,
} from "@/lib/resources-service";
import { redirect } from "next/navigation";
import { SmartLink } from "@/components/smart-link";
import {
  AdminDashboardTabs,
  AdminTabKey,
} from "@/components/admin/admin-dashboard-tabs";
import {
  Plus,
  LogOut,
  FileText,
  FileDown,
  Download,
  Globe,
  Sparkles,
  Users,
} from "lucide-react";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";

export const metadata = {
  title: "Dashboard Medico | Dott.ssa Giovanna Padalino",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const resolvedParams = await searchParams;
  const rawTab =
    typeof resolvedParams.tab === "string" ? resolvedParams.tab : "articoli";
  const initialTab: AdminTabKey =
    rawTab === "strumenti" || rawTab === "statistiche" ? rawTab : "articoli";

  const rawDays =
    typeof resolvedParams.days === "string" ? resolvedParams.days : "30";
  const initialDays: "7" | "30" | "all" =
    rawDays === "7" || rawDays === "all" ? rawDays : "30";

  const initialResourceId =
    typeof resolvedParams.resourceId === "string"
      ? resolvedParams.resourceId
      : "all";

  // Unica fetch parallela senza query duplicate su Supabase
  const [posts, resourcesRes, downloadsRes] = await Promise.all([
    getAllPostsAdmin(),
    getAllResourcesAdmin(),
    getRawDownloadsAdmin(),
  ]);

  const publishedPostsCount = posts.filter((p) => p.is_published).length;
  const publishedResourcesCount = resourcesRes.resources.filter(
    (r) => r.is_published
  ).length;
  const totalDownloadsAllTime = Math.max(
    resourcesRes.resources.reduce((acc, r) => acc + (r.download_count || 0), 0),
    downloadsRes.downloads.length
  );
  const colleagueCount = downloadsRes.downloads.filter(
    (d) => d.downloader_role === "collega"
  ).length;
  const colleaguePercentage =
    downloadsRes.downloads.length > 0
      ? Math.round((colleagueCount / downloadsRes.downloads.length) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-[#F5EBE1] pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 pointer-events-none z-0">
        <AutumnBranch
          className="w-36 sm:w-48 h-44 sm:h-56 opacity-40 sm:opacity-50"
          flipped
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top Bar Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#DFCEBA]">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 rounded-full bg-[#EADBCB] text-[#5C2A14] text-[11px] font-semibold mb-2 tracking-wide uppercase border border-[#DFCEBA]">
              <Sparkles className="w-3 h-3 text-[#C59B27]" />
              <span>Portale Medico • Lumina</span>
            </div>
            <h1 className="font-heading italic font-bold text-2xl sm:text-3xl text-[#2C1E16]">
              Dott.ssa Giovanna Padalino
            </h1>
            <p className="text-xs sm:text-sm text-[#735948]">
              Pannello riservato: articoli del blog, strumenti scaricabili e
              statistiche download
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <SmartLink
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-white/80 text-[#2C1E16] hover:bg-white transition-colors border border-[#DFCEBA] shadow-xs"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>Vedi Blog</span>
            </SmartLink>

            <SmartLink
              href="/admin/strumenti/nuovo"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#EADBCB] text-[#2C1E16] hover:bg-[#DFCDBB] transition-colors border border-[#DFCEBA]"
            >
              <Plus className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Nuovo Strumento</span>
            </SmartLink>

            <SmartLink
              href="/admin/nuovo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#C85A32] hover:bg-[#AF4621] transition-colors shadow-md terracotta-glow"
            >
              <Plus className="w-4 h-4" />
              <span>Nuovo Articolo</span>
            </SmartLink>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="p-2.5 text-[#8C6D58] hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors border border-transparent hover:border-rose-200"
                title="Disconnetti"
                aria-label="Disconnetti"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Panoramica sintetica in testa */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 mb-8">
          <div className="bg-white/95 p-4 sm:p-5 rounded-2xl border border-[#DFCEBA] shadow-xs flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold text-[#8C6D58] uppercase tracking-wider mb-1">
                Articoli Online
              </p>
              <h3 className="text-2xl font-bold font-heading text-[#2C1E16]">
                {publishedPostsCount}
                <span className="text-xs font-sans font-normal text-[#8C6D58] ml-1">
                  / {posts.length}
                </span>
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F5EBE1] text-[#C85A32] flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white/95 p-4 sm:p-5 rounded-2xl border border-[#DFCEBA] shadow-xs flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold text-[#8C6D58] uppercase tracking-wider mb-1">
                Strumenti Attivi
              </p>
              <h3 className="text-2xl font-bold font-heading text-[#2C1E16]">
                {publishedResourcesCount}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F5EBE1] text-[#C85A32] flex items-center justify-center shrink-0">
              <FileDown className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white/95 p-4 sm:p-5 rounded-2xl border border-[#DFCEBA] shadow-xs flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold text-[#8C6D58] uppercase tracking-wider mb-1">
                Download Totali
              </p>
              <h3 className="text-2xl font-bold font-heading text-[#2C1E16]">
                {totalDownloadsAllTime}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100 shrink-0">
              <Download className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white/95 p-4 sm:p-5 rounded-2xl border border-[#DFCEBA] shadow-xs flex items-center justify-between gap-2">
            <div>
              <p className="text-[11px] font-semibold text-[#C85A32] uppercase tracking-wider mb-1">
                Quota Colleghi
              </p>
              <h3 className="text-2xl font-bold font-heading text-[#2C1E16]">
                {colleaguePercentage}%
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Tab istantanei client-side: Articoli | Strumenti & Schede | Statistiche Download */}
        <AdminDashboardTabs
          initialTab={initialTab}
          posts={posts}
          resources={resourcesRes.resources}
          resourcesTablesReady={resourcesRes.tablesReady}
          rawDownloads={downloadsRes.downloads}
          downloadsTablesReady={downloadsRes.tablesReady}
          initialDays={initialDays}
          initialResourceId={initialResourceId}
        />
      </div>
    </div>
  );
}
