"use client";

import { DBPost } from "@/lib/blog-service";
import { deletePostAction } from "@/app/actions/admin-blog";
import { SmartLink } from "@/components/smart-link";
import { useState, useTransition } from "react";
import { Edit3, Trash2, ExternalLink, Sparkles, CheckCircle2, Clock, Plus, Search } from "lucide-react";

export function AdminPostList({ initialPosts }: { initialPosts: DBPost[] }) {
  const [posts, setPosts] = useState<DBPost[]>(initialPosts);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tutte");
  const [isPending, startTransition] = useTransition();

  const categories = [
    "Tutte",
    "ADHD e neurodivergenze",
    "Adolescenti e giovani adulti",
    "Genitorialità e scuola",
    "Ansia, autostima e relazioni",
    "Psicologia e benessere",
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tutte" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Sei sicura di voler eliminare l'articolo "${title}"?`)) {
      startTransition(async () => {
        const res = await deletePostAction(id);
        if (res?.success) {
          setPosts((prev) => prev.filter((p) => p.id !== id));
        } else {
          alert(`Errore nell'eliminazione: ${res?.error || "Operazione non riuscita"}`);
        }
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-white/95 p-4 sm:p-5 rounded-2xl border border-[#DFCEBA] shadow-xs flex flex-col sm:flex-row gap-3.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6D58]" />
          <input
            type="text"
            placeholder="Cerca per titolo o parola chiave..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-sm text-[#2C1E16] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filtra per categoria"
            className="w-full sm:w-auto px-3.5 py-2.5 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-xs sm:text-sm text-[#2C1E16] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <SmartLink
            href="/admin/nuovo"
            className="sm:hidden inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#C85A32] text-white rounded-xl text-xs font-semibold shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Nuovo</span>
          </SmartLink>
        </div>
      </div>

      {/* Posts List */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white/95 rounded-2xl p-10 text-center border border-[#DFCEBA] shadow-xs">
          <p className="text-[#8C6D58] text-sm">Nessun articolo trovato con i criteri selezionati.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white/95 rounded-2xl p-5 sm:p-6 border border-[#DFCEBA] shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EADBCB] text-[#C85A32] border border-[#DFCEBA]">
                    {post.category}
                  </span>
                  {post.is_published ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Pubblicato
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      <Clock className="w-3 h-3" />
                      Bozza
                    </span>
                  )}
                  {post.read_time && (
                    <span className="text-[11px] text-[#8C6D58]">
                      • {post.read_time}
                    </span>
                  )}
                </div>

                <h3 className="font-heading font-bold text-lg text-[#2C1E16] group-hover:text-primary transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5C4436] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F0E4D5] shrink-0">
                {post.is_published && (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-[#8C6D58] hover:text-[#2C1E16] hover:bg-[#FAF6F0] rounded-xl border border-transparent hover:border-[#DFCEBA] transition-colors"
                    title="Vedi articolo sul sito"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <SmartLink
                  href={`/admin/modifica/${post.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#EADBCB] text-[#2C1E16] hover:bg-[#DFCDBB] transition-colors border border-[#DFCEBA]"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Modifica</span>
                </SmartLink>

                <button
                  type="button"
                  onClick={() => handleDelete(post.id, post.title)}
                  disabled={isPending}
                  className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-50"
                  title="Elimina articolo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
