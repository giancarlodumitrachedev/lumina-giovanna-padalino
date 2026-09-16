import { notFound } from "next/navigation";
import Image from "next/image";
import { getPostBySlug, getPublishedPosts } from "@/lib/blog-service";
import { SmartLink } from "@/components/smart-link";
import { ArrowLeft, Clock, Calendar, MessageCircle, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";
import { parseBlogContentToHtml } from "@/lib/content-parser";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Articolo non trovato | Dott.ssa Giovanna Padalino" };

  return {
    title: `${post.title} | Dott.ssa Giovanna Padalino`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      locale: "it_IT",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await getPublishedPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);


  // Schema.org Article JSON-LD for rich SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": "Dott.ssa Giovanna V. Padalino",
      "jobTitle": "Psicologa Clinica e Pedagogista",
      "url": "https://www.miodottore.it/profilo/giovanna-valentina-padalino"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Spazio Accogliente - Dott.ssa Giovanna Padalino"
    },
    "datePublished": "2026-02-01",
    "inLanguage": "it"
  };

  return (
    <article className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 bg-[#F5EBE1] min-h-screen relative overflow-hidden">
      {/* Decorative foliage */}
      <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 pointer-events-none z-0">
        <AutumnBranch className="w-36 sm:w-48 h-44 sm:h-56 opacity-50 sm:opacity-65" flipped />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Back Link */}
        <div className="mb-6 sm:mb-8">
          <SmartLink
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8C6D58] hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Torna a tutti gli articoli del Blog</span>
          </SmartLink>
        </div>

        {/* Article Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 sm:mb-6">
            <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold bg-[#EADBCB] text-[#C85A32] border border-[#DFCEBA]">
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#8C6D58]">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
            <span className="text-[#DFCEBA]">•</span>
            <span className="flex items-center gap-1.5 text-[11px] sm:text-xs text-[#8C6D58]">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-heading font-bold text-[#2C1E16] leading-tight mb-4 sm:mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-[#5C2A14] font-heading italic leading-relaxed border-l-4 border-[#D4AF37] pl-4 sm:pl-5 py-2 bg-white/60 rounded-r-xl border border-r-0 border-y-0">
            {post.excerpt}
          </p>
        </header>

        {/* Article Body with Rich Typography (H2, H3, bold, lists, quotes) */}
        <div className="bg-white/95 rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-14 shadow-xs sm:shadow-sm border border-[#DFCEBA] mb-10 sm:mb-14">
          <div
            className="blog-rich-content"
            dangerouslySetInnerHTML={{ __html: parseBlogContentToHtml(post.content) }}
          />

          {/* Kintsugi Gold Divider */}
          <div className="pt-8 mt-8 border-t border-[#DFCEBA]/40">
            <div className="kintsugi-line w-full mb-6" />
            <p className="text-sm italic text-[#8C6D58]">
              "Spazio Accogliente" è il concept di ascolto clinico ed educativo della Dott.ssa Giovanna Padalino a Bologna e online.
            </p>
          </div>
        </div>

        {/* Author Bio Box */}
        <div className="bg-[#EADBCB]/60 rounded-3xl p-8 md:p-10 border border-[#DFCEBA] mb-16">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-md shrink-0 border-2 border-white">
              <Image
                src="/Assets/giovanna-padalino.jpg"
                alt="Dott.ssa Giovanna Padalino"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#C85A32] block mb-1">
                L'Autrice
              </span>
              <h3 className="font-heading italic font-bold text-xl text-[#2C1E16] mb-1">
                Dott.ssa Giovanna V. Padalino
              </h3>
              <p className="text-xs text-[#735948] mb-3">
                Psicologa clinica, Pedagogista e Tecnico ABA • Iscritta all'Ordine Psicologi E-R n. 12479
              </p>
              <p className="text-sm text-[#5C4436] leading-relaxed mb-4">
                Riceve a Bologna (venerdì) e online (lunedì-giovedì). Aiuta bambini, adolescenti, giovani adulti, adulti e famiglie a comprendere il proprio funzionamento e a valorizzare le proprie risorse personali.
              </p>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                <a
                  href="https://www.miodottore.it/profilo/giovanna-valentina-padalino"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#DFCEBA] text-xs font-semibold text-[#2C1E16] hover:bg-[#F5EBE1] transition-colors shadow-xs"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-primary" />
                  <span>MioDottore</span>
                </a>
                <a
                  href="https://www.instagram.com/gvpadalino.psicologa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#DFCEBA] text-xs font-semibold text-[#C85A32] hover:bg-[#F5EBE1] transition-colors shadow-xs"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://wa.me/393492679598?text=Gentile%20Dott.ssa%20Padalino,%20ho%20letto%20il%20suo%20articolo%20sul%20blog%20e%20vorrei%20informazioni."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white transition-colors shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div>
          <h3 className="font-heading font-bold text-2xl text-[#2C1E16] mb-6">
            Altri articoli di approfondimento
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <SmartLink
                key={rel.slug}
                href={`/blog/${rel.slug}`}
                className="bg-white/95 p-6 rounded-2xl border border-[#DFCEBA] hover:shadow-md hover:border-[#C85A32]/40 transition-all block group"
              >
                <span className="text-xs font-semibold text-[#C85A32] block mb-2">
                  {rel.category}
                </span>
                <h4 className="font-heading font-bold text-lg text-[#2C1E16] group-hover:text-primary transition-colors mb-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-[#6B5547] line-clamp-2">
                  {rel.excerpt}
                </p>
              </SmartLink>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
