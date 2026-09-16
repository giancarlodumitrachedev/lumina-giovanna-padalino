import { verifyAdminSession, logoutAdminAction } from "@/app/actions/admin-blog";
import { getAllPostsAdmin } from "@/lib/blog-service";
import { redirect } from "next/navigation";
import { SmartLink } from "@/components/smart-link";
import { AdminPostList } from "@/components/admin/post-list";
import { Plus, LogOut, FileText, CheckCircle2, Clock, Globe, Sparkles } from "lucide-react";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";

export const metadata = {
  title: "Dashboard Medico | Dott.ssa Giovanna Padalino",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminDashboardPage() {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const posts = await getAllPostsAdmin();
  const publishedCount = posts.filter((p) => p.is_published).length;
  const draftCount = posts.length - publishedCount;

  return (
    <div className="min-h-screen bg-[#F5EBE1] pt-10 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative foliage */}
      <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 pointer-events-none z-0">
        <AutumnBranch className="w-36 sm:w-48 h-44 sm:h-56 opacity-40 sm:opacity-50" flipped />
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
              Pannello redazionale: gestione articoli e risorse cliniche per il blog
            </p>
          </div>

          <div className="flex items-center gap-3">
            <SmartLink
              href="/blog"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-white/80 text-[#2C1E16] hover:bg-white transition-all border border-[#DFCEBA] shadow-xs"
            >
              <Globe className="w-3.5 h-3.5 text-primary" />
              <span>Vedi Blog</span>
            </SmartLink>

            <SmartLink
              href="/admin/nuovo"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#C85A32] hover:bg-[#AF4621] transition-all shadow-md terracotta-glow"
            >
              <Plus className="w-4 h-4" />
              <span>Nuovo Articolo</span>
            </SmartLink>

            <form action={logoutAdminAction}>
              <button
                type="submit"
                className="p-2.5 text-[#8C6D58] hover:text-rose-700 hover:bg-rose-50 rounded-full transition-colors border border-transparent hover:border-rose-200"
                title="Disconnetti"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/95 p-5 rounded-2xl border border-[#DFCEBA] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[#8C6D58] uppercase tracking-wider mb-1">
                Totale Articoli
              </p>
              <h3 className="text-2xl font-bold font-heading text-[#2C1E16]">
                {posts.length}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-[#F5EBE1] text-[#C85A32] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white/95 p-5 rounded-2xl border border-[#DFCEBA] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">
                Pubblicati Online
              </p>
              <h3 className="text-2xl font-bold font-heading text-emerald-900">
                {publishedCount}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white/95 p-5 rounded-2xl border border-[#DFCEBA] shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-800 uppercase tracking-wider mb-1">
                Bozze Private
              </p>
              <h3 className="text-2xl font-bold font-heading text-amber-900">
                {draftCount}
              </h3>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-100">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Posts Table and Management */}
        <AdminPostList initialPosts={posts} />
      </div>
    </div>
  );
}
