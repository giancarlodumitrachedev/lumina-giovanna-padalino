"use client";

import { useState, useMemo } from "react";
import { BlogPost, blogCategories } from "@/lib/blog-data";
import { SmartLink } from "@/components/smart-link";
import { Search, Clock, Calendar, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BlogFeed({ posts }: { posts: BlogPost[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Tutte le categorie");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "Tutte le categorie" || post.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  return (
    <div className="w-full space-y-10">
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto relative">
        <div className="relative flex items-center">
          <Search className="absolute left-4 w-5 h-5 text-[#8C6D58]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca negli articoli per argomento (es. ADHD, ansia, scuola)..."
            className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-[#E8DDCF] text-[#2C1E16] placeholder:text-[#8C6D58]/60 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/50 shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 text-xs font-semibold text-[#8C6D58] hover:text-[#2C1E16]"
            >
              Cancella
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto">
        {blogCategories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? "bg-[#C85A32] text-white shadow-md terracotta-glow scale-105"
                  : "bg-white text-[#5C4436] border border-[#E8DDCF] hover:bg-[#F5EFEB] hover:border-[#DFCBB5]"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Results Counter */}
      <div className="text-center text-xs text-[#8C6D58]">
        Mostrando {filteredPosts.length} {filteredPosts.length === 1 ? "articolo" : "articoli"}
        {selectedCategory !== "Tutte le categorie" && ` in "${selectedCategory}"`}
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-[#E8DDCF] p-8 max-w-md mx-auto">
          <p className="text-lg font-heading text-[#2C1E16] mb-2">Nessun articolo trovato</p>
          <p className="text-xs text-[#8C6D58] mb-6">Prova a cercare con un altro termine o seleziona un'altra categoria.</p>
          <button
            onClick={() => { setSelectedCategory("Tutte le categorie"); setSearchQuery(""); }}
            className="px-5 py-2 rounded-full bg-[#FAF6F0] border border-[#E8DDCF] text-xs font-semibold text-[#2C1E16] hover:bg-[#F5EFEB]"
          >
            Reimposta filtri
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredPosts.map((post, idx) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-white rounded-3xl p-7 shadow-sm border border-[#E8DDCF] flex flex-col justify-between hover:shadow-lg hover:border-[#C85A32]/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F5EFEB] text-[#C85A32] border border-[#E8DDCF]">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#8C6D58]">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#2C1E16] mb-3 group-hover:text-primary transition-colors leading-snug">
                    <SmartLink href={`/blog/${post.slug}`}>
                      {post.title}
                    </SmartLink>
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-[#8C6D58] mb-4">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.author}</span>
                  </div>

                  <p className="text-sm text-[#5C4436] leading-relaxed line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F2E8DC] flex items-center justify-between">
                  <SmartLink
                    href={`/blog/${post.slug}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#FAF6F0] group-hover:bg-[#C85A32] text-[#2C1E16] group-hover:text-white font-medium text-xs transition-colors border border-[#E8DDCF] group-hover:border-transparent"
                  >
                    <span>Leggi l'articolo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </SmartLink>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
