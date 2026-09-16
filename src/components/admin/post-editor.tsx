"use client";

import { useActionState, useState } from "react";
import { savePostAction, uploadCoverImageAction } from "@/app/actions/admin-blog";
import { DBPost } from "@/lib/blog-service";
import { SmartLink } from "@/components/smart-link";
import {
  ArrowLeft,
  Save,
  Eye,
  Edit,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  UploadCloud,
  Image as ImageIcon,
  Trash2,
  RefreshCw,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { RichTextEditor } from "./rich-text-editor";
import { parseBlogContentToHtml, calculateReadingTime } from "@/lib/content-parser";

const categories = [
  "ADHD e neurodivergenze",
  "Adolescenti e giovani adulti",
  "Genitorialità e scuola",
  "Ansia, autostima e relazioni",
  "Psicologia e benessere",
] as const;

export function AdminPostEditor({ post }: { post?: DBPost | null }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(savePostAction, null);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const [title, setTitle] = useState(post?.title || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState<string>(post?.category || categories[0]);
  const [readTime, setReadTime] = useState(
    post?.read_time || calculateReadingTime(post?.content || "").text
  );
  const [coverImage, setCoverImage] = useState<string>(post?.cover_image || "");
  const [isPublished, setIsPublished] = useState(post ? post.is_published : true);

  // Stati upload immagine su Supabase Storage
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Gestione upload copertina su Supabase Storage
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await uploadCoverImageAction(formData);
      if (res.success && res.url) {
        setCoverImage(res.url);
      } else {
        setUploadError(res.error || "Errore durante il caricamento");
      }
    } catch (err: any) {
      setUploadError(err.message || "Errore di connessione");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // Aggiornamento contenuto ed ricalcolo automatico del tempo di lettura
  const handleContentChange = (newHtml: string) => {
    setContent(newHtml);
    const reading = calculateReadingTime(newHtml);
    setReadTime(reading.text);
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DFCEBA]">
        <div className="flex items-center gap-3">
          <SmartLink
            href="/admin"
            className="p-2 bg-white/80 hover:bg-white text-[#8C6D58] hover:text-[#2C1E16] rounded-xl border border-[#DFCEBA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </SmartLink>
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2C1E16]">
              {post ? "Modifica Articolo" : "Nuovo Articolo"}
            </h1>
            <p className="text-xs text-[#735948]">
              {post
                ? "Aggiorna contenuti, copertina e stato di pubblicazione"
                : "Crea una nuova risorsa clinica per il blog Spazio Accogliente"}
            </p>
          </div>
        </div>

        {/* Tab switch for live preview */}
        <div className="flex items-center bg-[#EADBCB]/60 p-1 rounded-xl border border-[#DFCEBA]">
          <button
            type="button"
            onClick={() => setActiveTab("edit")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "edit"
                ? "bg-white text-[#2C1E16] shadow-xs"
                : "text-[#735948] hover:text-[#2C1E16]"
            }`}
          >
            <Edit className="w-3.5 h-3.5" />
            <span>Editor Stile Word</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "preview"
                ? "bg-white text-[#2C1E16] shadow-xs"
                : "text-[#735948] hover:text-[#2C1E16]"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Anteprima Live</span>
          </button>
        </div>
      </div>

      {/* Status banners */}
      {state?.error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-2xl flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {state?.success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm rounded-2xl flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{state.message}</span>
          </div>
          <SmartLink
            href="/admin"
            className="text-xs font-semibold text-emerald-900 underline hover:no-underline"
          >
            Torna alla lista articoli →
          </SmartLink>
        </div>
      )}

      {/* Main Content Area */}
      {activeTab === "edit" ? (
        <form action={formAction} className="space-y-6">
          <input type="hidden" name="id" value={post?.id || ""} />
          <input type="hidden" name="cover_image" value={coverImage} />

          <div className="bg-white/95 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#DFCEBA] shadow-xs space-y-6">
            {/* Upload Immagine di Copertina (Supabase Storage) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16]">
                  Immagine di Copertina (Supabase Storage)
                </label>
                <span className="text-[11px] text-[#8C6D58]">
                  Consigliata proporzione orizzontale 16:9 o 21:9
                </span>
              </div>

              {coverImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-[#DFCEBA] bg-[#FAF6F0] group">
                  <div className="relative aspect-[21/9] sm:aspect-[3/1] w-full">
                    <img
                      src={coverImage}
                      alt="Anteprima copertina"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white/95 border-t border-[#DFCEBA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-xs text-[#735948] truncate flex items-center gap-1.5">
                      <ImageIcon className="w-3.5 h-3.5 text-[#C85A32]" />
                      Copertina caricata su Supabase Storage
                    </span>
                    <div className="flex items-center gap-2 shrink-0">
                      <label className="cursor-pointer px-3 py-1.5 bg-[#FAF6F0] hover:bg-[#EADBCB] text-[#2C1E16] text-xs font-semibold rounded-lg border border-[#DFCEBA] transition-colors flex items-center gap-1">
                        <RefreshCw className="w-3 h-3" />
                        <span>Sostituisci</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/avif"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                          className="sr-only"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => setCoverImage("")}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Rimuovi</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <label className="relative flex flex-col items-center justify-center p-6 sm:p-8 border-2 border-dashed border-[#DFCEBA] hover:border-[#C85A32] rounded-2xl bg-[#FAF6F0]/60 hover:bg-[#FAF6F0] cursor-pointer transition-all text-center group">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/avif"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                    className="sr-only"
                  />
                  {isUploading ? (
                    <div className="flex flex-col items-center gap-2 py-3">
                      <div className="w-8 h-8 border-2 border-[#C85A32] border-t-transparent rounded-full animate-spin" />
                      <span className="text-xs font-medium text-[#C85A32]">
                        Caricamento in corso su Supabase Storage...
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="p-3 bg-white rounded-full text-[#C85A32] shadow-xs group-hover:scale-105 transition-transform mb-2">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-xs sm:text-sm font-semibold text-[#2C1E16]">
                        Clicca o trascina qui la copertina dell'articolo
                      </p>
                      <p className="text-[11px] text-[#8C6D58] mt-1">
                        Formati supportati: JPG, PNG, WEBP, AVIF (fino a 5MB)
                      </p>
                    </>
                  )}
                </label>
              )}

              {uploadError && (
                <p className="text-xs text-rose-600 mt-2 flex items-center gap-1">
                  <span>⚠️</span> {uploadError}
                </p>
              )}
            </div>

            {/* Titolo */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16] mb-2">
                Titolo dell'Articolo *
              </label>
              <input
                type="text"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="es. ADHD negli adulti: quando la difficoltà non è mancanza di volontà..."
                className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-base font-heading font-semibold text-[#2C1E16] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
              />
            </div>

            {/* Grid Categoria & Tempo di Lettura (Calcolato in automatico) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16] mb-2">
                  Categoria Clinica *
                </label>
                <select
                  name="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-xs sm:text-sm text-[#2C1E16] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16]">
                    Tempo di Lettura
                  </label>
                  <span className="inline-flex items-center gap-1 text-[11px] text-[#C85A32] font-semibold bg-[#FAF6F0] px-2 py-0.5 rounded-md border border-[#DFCEBA]/70">
                    <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                    Calcolato in automatico
                  </span>
                </div>
                <div className="relative">
                  <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C6D58]" />
                  <input
                    type="text"
                    name="read_time"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="es. 5 min di lettura"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-xs sm:text-sm text-[#2C1E16] font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30"
                  />
                </div>
              </div>
            </div>

            {/* Riassunto / Excerpt */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16]">
                  Riassunto / Abstract (visibile nelle card di anteprima) *
                </label>
                <span className="text-[11px] text-[#8C6D58]">{excerpt.length} caratteri</span>
              </div>
              <textarea
                name="excerpt"
                required
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Breve sintesi clinica dei punti trattati nell'articolo..."
                className="w-full p-3.5 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-sm text-[#2C1E16] leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
              />
            </div>

            {/* Contenuto dell'Articolo con Editor Stile Word */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16]">
                  Contenuto dell'Articolo (Editor Stile Word) *
                </label>
                <span className="text-[11px] text-[#8C6D58]">
                  Scrivi o incolla direttamente da Microsoft Word / Google Docs
                </span>
              </div>
              <RichTextEditor
                initialValue={content}
                onChange={handleContentChange}
                name="content"
              />
            </div>

            {/* Stato di Pubblicazione */}
            <div className="pt-4 border-t border-[#F0E4D5] flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-sm text-[#2C1E16]">Stato di Pubblicazione</h4>
                <p className="text-xs text-[#735948]">
                  {isPublished
                    ? "L'articolo sarà visibile immediatamente sul sito web."
                    : "L'articolo rimarrà salvato come bozza privata solo nel tuo portale."}
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="is_published"
                  value="true"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#DFCEBA] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C85A32]"></div>
              </label>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <SmartLink
              href="/admin"
              className="px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-[#735948] hover:text-[#2C1E16] hover:bg-white/60 transition-colors"
            >
              Annulla
            </SmartLink>

            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#C85A32] hover:bg-[#AF4621] transition-all shadow-md disabled:opacity-50 terracotta-glow"
            >
              <Save className="w-4 h-4" />
              <span>{isPending ? "Salvataggio in corso..." : "Salva Articolo"}</span>
            </button>
          </div>
        </form>
      ) : (
        /* Live Preview Mode */
        <div className="bg-white/95 rounded-2xl sm:rounded-3xl p-6 sm:p-12 border border-[#DFCEBA] shadow-sm space-y-6">
          {coverImage && (
            <div className="relative aspect-[21/9] w-full rounded-2xl overflow-hidden shadow-xs border border-[#DFCEBA] mb-6">
              <img
                src={coverImage}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#EADBCB] text-[#C85A32] border border-[#DFCEBA]">
              {category}
            </span>
            <span className="text-xs text-[#8C6D58] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {readTime}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-bold text-[#2C1E16]">
            {title || "Titolo dell'articolo..."}
          </h2>

          <p className="text-base sm:text-lg text-[#5C2A14] font-heading italic leading-relaxed border-l-4 border-[#D4AF37] pl-4 py-2 bg-[#FAF6F0] rounded-r-xl">
            {excerpt || "Riassunto dell'articolo..."}
          </p>

          <div className="pt-6 border-t border-[#F0E4D5]">
            <div
              className="blog-rich-content"
              dangerouslySetInnerHTML={{
                __html:
                  parseBlogContentToHtml(content) ||
                  "<p class='text-[#8C6D58] italic'>Il contenuto dell'articolo apparirà qui...</p>",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
