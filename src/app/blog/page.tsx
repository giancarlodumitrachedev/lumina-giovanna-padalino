import { getPublishedPosts } from "@/lib/blog-service";
import { getPublishedResources } from "@/lib/resources-service";
import { BlogHub } from "@/components/blog/blog-hub";
import { Sparkles } from "lucide-react";
import { AutumnBranch } from "@/components/decorations/autumn-decorations";

export const metadata = {
  title:
    "Blog & Risorse | Dott.ssa Giovanna Padalino - Psicologa a Bologna e Online",
  description:
    "Uno spazio accogliente per comprendere ciò che stiamo vivendo e trovare nuovi modi per affrontarlo. Articoli clinici e strumenti scaricabili gratuiti su ADHD, neurodivergenze, scuola e benessere emotivo.",
};

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [resolvedParams, posts, resources] = await Promise.all([
    searchParams,
    getPublishedPosts(),
    getPublishedResources(),
  ]);

  const sezioneParam =
    typeof resolvedParams.sezione === "string"
      ? resolvedParams.sezione.toLowerCase()
      : "";
  const initialSection =
    sezioneParam === "strumenti" ? "strumenti" : "articoli";

  return (
    <div className="pt-24 sm:pt-28 md:pt-32 pb-16 md:pb-24 bg-[#F5EBE1] min-h-screen relative overflow-hidden">
      {/* Decorative Autumn Leaves in background */}
      <div className="absolute top-0 right-0 translate-x-6 -translate-y-6 pointer-events-none z-0">
        <AutumnBranch
          className="w-36 sm:w-48 h-44 sm:h-56 opacity-50 sm:opacity-65"
          flipped
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Identità & Posizionamento SEO Personale */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 py-1.5 px-3 sm:px-4 rounded-full bg-[#EADBCB] text-[#5C2A14] text-[11px] sm:text-xs font-semibold mb-3 sm:mb-4 tracking-wide uppercase border border-[#DFCEBA]">
            <Sparkles className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
            <span>Spazio Accogliente • Blog &amp; Risorse Cliniche</span>
          </div>

          <h1 className="text-[#2C1E16] font-heading italic font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-2 sm:mb-3">
            Dott.ssa Giovanna Padalino
          </h1>
          <p className="text-lg md:text-xl text-[#C85A32] font-heading font-medium mb-4">
            Psicologa | Bologna e online
          </p>
          <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mb-6" />

          <p className="text-base md:text-lg text-[#5C4436] leading-relaxed max-w-2xl mx-auto italic">
            &ldquo;Uno spazio accogliente per far comprendere ciò che la persona
            sta vivendo e trovare nuovi modi per affrontarlo.&rdquo;
          </p>
        </div>

        {/* Hub Integrato: Articoli + Strumenti & Schede Scaricabili */}
        <BlogHub
          posts={posts}
          resources={resources}
          initialSection={initialSection}
        />
      </div>
    </div>
  );
}
