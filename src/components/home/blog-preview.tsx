"use client";

import { motion } from "framer-motion";
import { SmartLink } from "@/components/smart-link";
import { blogPosts } from "@/lib/blog-data";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";

export function BlogPreviewSection() {
  const previewPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 md:py-28 bg-[#F5EBE1] relative overflow-hidden">
      {/* Decorative foliage in corner */}
      <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 pointer-events-none z-0">
        <AutumnBranch className="w-40 h-48 opacity-65" flipped />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Spazio Accogliente • Approfondimenti</span>
            </div>
            <h2 className="text-[#2C1E16] font-heading text-3xl md:text-5xl font-bold mb-3">
              E Dal Blog?
            </h2>
            <p className="text-base text-[#6B5547]">
              Riflessioni, neurodivergenze e percorsi di consapevolezza per comprendere ciò che viviamo.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SmartLink
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#DFCEBA] text-[#2C1E16] hover:text-primary hover:border-primary font-medium text-sm transition-all shadow-sm group"
            >
              <span>Tutti gli articoli</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </SmartLink>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewPosts.map((post, idx) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.05, margin: "100px 0px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/95 rounded-3xl p-7 shadow-sm border border-[#DFCEBA] flex flex-col justify-between hover:shadow-md hover:border-[#C85A32]/50 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EADBCB] text-[#C85A32] border border-[#DFCEBA]">
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

                <p className="text-sm text-[#5C4436] leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F0E4D5] flex items-center justify-between">
                <span className="text-xs text-[#8C6D58]">{post.date}</span>
                <SmartLink
                  href={`/blog/${post.slug}`}
                  className="text-xs font-semibold text-primary group-hover:text-[#AF4621] flex items-center gap-1"
                >
                  Leggi <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </SmartLink>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
