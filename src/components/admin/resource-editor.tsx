"use client";

import { useActionState, useState } from "react";
import {
  createResourceUploadUrlAction,
  saveResourceAction,
} from "@/app/actions/admin-resources";
import { DBResource, formatFileSize } from "@/lib/resources-data";
import { supabase } from "@/lib/supabase/client";
import { SmartLink } from "@/components/smart-link";
import {
  ArrowLeft,
  Save,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  ShieldAlert,
  Trash2,
  RefreshCw,
} from "lucide-react";

const categories = [
  "Psicologia e benessere",
  "ADHD e neurodivergenze",
  "Adolescenti e giovani adulti",
  "Genitorialità e scuola",
  "Ansia, autostima e relazioni",
] as const;

export function AdminResourceEditor({
  resource,
}: {
  resource?: DBResource | null;
}) {
  const [state, formAction, isPending] = useActionState(
    saveResourceAction,
    null
  );

  const [title, setTitle] = useState(resource?.title || "");
  const [description, setDescription] = useState(resource?.description || "");
  const [category, setCategory] = useState<string>(
    resource?.category || categories[0]
  );
  const [targetAudience, setTargetAudience] = useState(
    resource?.target_audience ||
      "Colleghi, genitori, insegnanti e uso personale"
  );
  const [fileUrl, setFileUrl] = useState(resource?.file_url || "");
  const [fileName, setFileName] = useState(resource?.file_name || "");
  const [fileType, setFileType] = useState<"pdf" | "image">(
    resource?.file_type || "pdf"
  );
  const [mimeType, setMimeType] = useState(
    resource?.mime_type || "application/pdf"
  );
  const [fileSizeBytes, setFileSizeBytes] = useState<number>(
    resource?.file_size_bytes || 0
  );
  const [previewImageUrl, setPreviewImageUrl] = useState(
    resource?.preview_image_url || ""
  );
  const [isPublished, setIsPublished] = useState(
    resource ? resource.is_published : true
  );

  const [uploadingFile, setUploadingFile] = useState(false);
  const [uploadingPreview, setUploadingPreview] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadViaSignedUrl = async (
    file: File,
    kind: "resource" | "preview"
  ): Promise<string | null> => {
    const signed = await createResourceUploadUrlAction({
      fileName: file.name,
      contentType: file.type,
      fileSize: file.size,
      kind,
    });

    if (!signed.success || !signed.path || !signed.token || !signed.publicUrl) {
      setUploadError(signed.error || "Errore nella preparazione dell'upload.");
      return null;
    }

    const { error } = await supabase.storage
      .from("clinical-resources")
      .uploadToSignedUrl(signed.path, signed.token, file, {
        contentType: file.type,
      });

    if (error) {
      setUploadError(`Errore durante il caricamento: ${error.message}`);
      return null;
    }

    return signed.publicUrl;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFile(true);
    setUploadError(null);

    try {
      const publicUrl = await uploadViaSignedUrl(file, "resource");
      if (publicUrl) {
        const isImg = file.type.startsWith("image/");
        setFileUrl(publicUrl);
        setFileName(file.name);
        setFileType(isImg ? "image" : "pdf");
        setMimeType(file.type || "application/pdf");
        setFileSizeBytes(file.size);

        // Se è un'immagine e non c'è ancora una miniatura, la usiamo automaticamente
        if (isImg && !previewImageUrl) {
          setPreviewImageUrl(publicUrl);
        }
      }
    } catch (err: unknown) {
      setUploadError(
        err instanceof Error ? err.message : "Errore di connessione."
      );
    } finally {
      setUploadingFile(false);
      e.target.value = "";
    }
  };

  const handlePreviewUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPreview(true);
    setUploadError(null);

    try {
      const publicUrl = await uploadViaSignedUrl(file, "preview");
      if (publicUrl) {
        setPreviewImageUrl(publicUrl);
      }
    } catch (err: unknown) {
      setUploadError(
        err instanceof Error ? err.message : "Errore di connessione."
      );
    } finally {
      setUploadingPreview(false);
      e.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DFCEBA]">
        <div className="flex items-center gap-3">
          <SmartLink
            href="/admin?tab=strumenti"
            className="p-2 bg-white/80 hover:bg-white text-[#8C6D58] hover:text-[#2C1E16] rounded-xl border border-[#DFCEBA] transition-colors"
            aria-label="Torna agli strumenti"
          >
            <ArrowLeft className="w-4 h-4" />
          </SmartLink>
          <div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-[#2C1E16]">
              {resource ? "Modifica Strumento" : "Nuovo Strumento Scaricabile"}
            </h1>
            <p className="text-xs text-[#735948]">
              Carica un PDF stampabile o un&apos;immagine da condividere nella
              sezione Strumenti del blog
            </p>
          </div>
        </div>
      </div>

      {/* Banners */}
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
            href="/admin?tab=strumenti"
            className="text-xs font-semibold text-emerald-900 underline hover:no-underline"
          >
            Torna agli strumenti →
          </SmartLink>
        </div>
      )}

      {uploadError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm rounded-2xl flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Form */}
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="id" value={resource?.id || ""} />
        <input type="hidden" name="slug" value={resource?.slug || ""} />
        <input type="hidden" name="file_url" value={fileUrl} />
        <input type="hidden" name="file_name" value={fileName} />
        <input type="hidden" name="file_type" value={fileType} />
        <input type="hidden" name="mime_type" value={mimeType} />
        <input type="hidden" name="file_size_bytes" value={fileSizeBytes} />
        <input
          type="hidden"
          name="preview_image_url"
          value={previewImageUrl}
        />

        <div className="bg-white/95 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#DFCEBA] shadow-xs space-y-6">
          {/* 1. Upload File Scaricabile (PDF o Immagine) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16]">
                File Scaricabile (PDF o Immagine) *
              </label>
              <span className="text-[11px] text-[#8C6D58]">
                PDF, JPG, PNG, WEBP fino a 15 MB
              </span>
            </div>

            {fileUrl ? (
              <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#DFCEBA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-white border border-[#DFCEBA] text-[#C85A32] flex items-center justify-center shrink-0">
                    {fileType === "pdf" ? (
                      <FileText className="w-5 h-5" />
                    ) : (
                      <ImageIcon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#2C1E16] truncate">
                      {fileName}
                    </p>
                    <p className="text-xs text-[#735948]">
                      {fileType === "pdf" ? "Documento PDF" : "Immagine"} •{" "}
                      {formatFileSize(fileSizeBytes)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <label className="cursor-pointer px-3 py-1.5 bg-white hover:bg-[#EADBCB]/70 text-[#2C1E16] text-xs font-semibold rounded-lg border border-[#DFCEBA] transition-colors flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" />
                    <span>Sostituisci</span>
                    <input
                      type="file"
                      accept="application/pdf,image/jpeg,image/png,image/webp,image/avif"
                      onChange={handleFileUpload}
                      disabled={uploadingFile}
                      className="sr-only"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setFileUrl("");
                      setFileName("");
                      setFileSizeBytes(0);
                    }}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Rimuovi</span>
                  </button>
                </div>
              </div>
            ) : (
              <label className="relative flex flex-col items-center justify-center p-7 border-2 border-dashed border-[#DFCEBA] hover:border-[#C85A32] rounded-2xl bg-[#FAF6F0]/60 hover:bg-[#FAF6F0] cursor-pointer transition-all text-center group">
                <input
                  type="file"
                  accept="application/pdf,image/jpeg,image/png,image/webp,image/avif"
                  onChange={handleFileUpload}
                  disabled={uploadingFile}
                  className="sr-only"
                />
                {uploadingFile ? (
                  <div className="flex flex-col items-center gap-2 py-2">
                    <div className="w-8 h-8 border-2 border-[#C85A32] border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs font-medium text-[#C85A32]">
                      Caricamento file su Supabase Storage...
                    </span>
                  </div>
                ) : (
                  <>
                    <div className="p-3 bg-white rounded-full text-[#C85A32] shadow-xs group-hover:scale-105 transition-transform mb-2">
                      <UploadCloud className="w-6 h-6" />
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#2C1E16]">
                      Clicca o trascina qui il PDF o l&apos;immagine
                    </p>
                    <p className="text-[11px] text-[#8C6D58] mt-1">
                      Formati accettati: PDF, JPG, PNG, WEBP (fino a 15 MB)
                    </p>
                  </>
                )}
              </label>
            )}
          </div>

          {/* 2. Immagine di Anteprima (opzionale ma consigliata per PDF) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16]">
                Immagine di Anteprima (opzionale)
              </label>
              <span className="text-[11px] text-[#8C6D58]">
                Mostra una miniatura reale della scheda nel blog
              </span>
            </div>

            {previewImageUrl ? (
              <div className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#DFCEBA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={previewImageUrl}
                    alt="Anteprima scheda"
                    className="w-16 h-16 rounded-xl object-cover border border-[#DFCEBA] bg-white"
                  />
                  <div>
                    <p className="text-xs font-semibold text-[#2C1E16]">
                      Anteprima visiva pronta
                    </p>
                    <p className="text-[11px] text-[#735948]">
                      Visibile nella card del blog e nel lightbox di anteprima
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <label className="cursor-pointer px-3 py-1.5 bg-white hover:bg-[#EADBCB]/70 text-[#2C1E16] text-xs font-semibold rounded-lg border border-[#DFCEBA] transition-colors">
                    Cambia
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/avif"
                      onChange={handlePreviewUpload}
                      disabled={uploadingPreview}
                      className="sr-only"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setPreviewImageUrl("")}
                    className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg transition-colors"
                  >
                    Rimuovi
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex items-center justify-center gap-2.5 p-4 border border-dashed border-[#DFCEBA] hover:border-[#C85A32] rounded-2xl bg-[#FAF6F0]/40 hover:bg-[#FAF6F0] cursor-pointer transition-colors">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  onChange={handlePreviewUpload}
                  disabled={uploadingPreview}
                  className="sr-only"
                />
                {uploadingPreview ? (
                  <span className="text-xs text-[#C85A32] font-medium">
                    Caricamento anteprima...
                  </span>
                ) : (
                  <>
                    <ImageIcon className="w-4 h-4 text-[#C85A32]" />
                    <span className="text-xs font-medium text-[#5C4436]">
                      Carica uno screenshot o copertina della scheda (JPG/PNG)
                    </span>
                  </>
                )}
              </label>
            )}
          </div>

          {/* 3. Titolo */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16] mb-2">
              Titolo dello Strumento *
            </label>
            <input
              type="text"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="es. La Mia Mappa Emotiva"
              className="w-full px-4 py-3 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-base font-heading font-semibold text-[#2C1E16] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
            />
          </div>

          {/* 4. Categoria & Destinatari */}
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
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16] mb-2">
                Pensato per (Destinatari)
              </label>
              <input
                type="text"
                name="target_audience"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="es. Colleghi, genitori, insegnanti e uso personale"
                className="w-full px-3.5 py-2.5 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-xs sm:text-sm text-[#2C1E16] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30"
              />
            </div>
          </div>

          {/* 5. Descrizione */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#2C1E16] mb-2">
              Descrizione dello Strumento *
            </label>
            <textarea
              name="description"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Spiega brevemente a cosa serve questa scheda e come può essere utilizzata in seduta, a scuola o a casa..."
              className="w-full p-3.5 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-sm text-[#2C1E16] leading-relaxed focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 focus:border-[#C85A32]"
            />
          </div>

          {/* 6. Stato di Pubblicazione */}
          <div className="pt-4 border-t border-[#F0E4D5] flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-sm text-[#2C1E16]">
                Visibile sul Blog
              </h4>
              <p className="text-xs text-[#735948]">
                {isPublished
                  ? "Lo strumento è visibile e scaricabile gratuitamente nella sezione Strumenti del blog."
                  : "Salvato come bozza privata: visibile solo in questo portale."}
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
              <div className="w-11 h-6 bg-[#DFCEBA] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C85A32]" />
            </label>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <SmartLink
            href="/admin?tab=strumenti"
            className="px-5 py-3 rounded-full text-xs sm:text-sm font-medium text-[#735948] hover:text-[#2C1E16] hover:bg-white/60 transition-colors"
          >
            Annulla
          </SmartLink>

          <button
            type="submit"
            disabled={isPending || uploadingFile || uploadingPreview}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#C85A32] hover:bg-[#AF4621] transition-all shadow-md disabled:opacity-50 terracotta-glow"
          >
            <Save className="w-4 h-4" />
            <span>
              {isPending ? "Salvataggio in corso..." : "Salva Strumento"}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
