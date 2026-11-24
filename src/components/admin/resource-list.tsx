"use client";

import { useState, useTransition } from "react";
import { DBResource, formatFileSize } from "@/lib/resources-data";
import { deleteResourceAction } from "@/app/actions/admin-resources";
import { SmartLink } from "@/components/smart-link";
import {
  FileText,
  Image as ImageIcon,
  Download,
  Edit3,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Clock,
  Plus,
  AlertCircle,
} from "lucide-react";

export function AdminResourceList({
  initialResources,
  tablesReady,
}: {
  initialResources: DBResource[];
  tablesReady: boolean;
}) {
  const [resources, setResources] = useState<DBResource[]>(initialResources);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string, title: string) => {
    if (
      confirm(
        `Sei sicura di voler eliminare lo strumento "${title}"? Anche i relativi log di download verranno rimossi.`
      )
    ) {
      startTransition(async () => {
        const res = await deleteResourceAction(id);
        if (res?.success) {
          setResources((prev) => prev.filter((r) => r.id !== id));
        } else {
          alert(
            `Errore nell'eliminazione: ${res?.error || "Operazione non riuscita"}`
          );
        }
      });
    }
  };

  return (
    <div className="space-y-5">
      {!tablesReady && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">
              Database strumenti in attesa di attivazione su Supabase
            </p>
            <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
              Lo strumento <strong>La Mia Mappa Emotiva</strong> è già attivo e
              scaricabile sul blog. Per salvare nuovi strumenti e registrare i
              download in tempo reale, esegui la migrazione SQL{" "}
              <code className="bg-amber-100 px-1.5 py-0.5 rounded">
                supabase/migrations/20261124_create_resources_tables.sql
              </code>{" "}
              nel SQL Editor di Supabase.
            </p>
          </div>
        </div>
      )}

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/95 p-4 sm:p-5 rounded-2xl border border-[#DFCEBA] shadow-xs">
        <div>
          <h2 className="font-heading font-bold text-lg text-[#2C1E16]">
            Catalogo Strumenti &amp; Schede
          </h2>
          <p className="text-xs text-[#735948]">
            PDF stampabili e immagini condivisi gratuitamente nella pagina Blog
            e allegabili agli articoli
          </p>
        </div>

        <SmartLink
          href="/admin/strumenti/nuovo"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-[#C85A32] hover:bg-[#AF4621] transition-all shadow-sm terracotta-glow shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nuovo Strumento</span>
        </SmartLink>
      </div>

      {/* Lista risorse */}
      {resources.length === 0 ? (
        <div className="bg-white/95 rounded-2xl p-10 text-center border border-[#DFCEBA] shadow-xs space-y-3">
          <p className="text-[#8C6D58] text-sm">
            Nessuno strumento caricato al momento.
          </p>
          <SmartLink
            href="/admin/strumenti/nuovo"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#C85A32] text-white text-xs font-semibold"
          >
            <Plus className="w-3.5 h-3.5" />
            Carica il primo strumento
          </SmartLink>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {resources.map((item) => (
            <div
              key={item.id}
              className="bg-white/95 rounded-2xl p-5 sm:p-6 border border-[#DFCEBA] shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Miniatura */}
                {item.preview_image_url ? (
                  <img
                    src={item.preview_image_url}
                    alt={item.title}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-[#DFCEBA] bg-[#FAF6F0] shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-[#F5EBE1] border border-[#DFCEBA] text-[#C85A32] flex items-center justify-center shrink-0">
                    {item.file_type === "pdf" ? (
                      <FileText className="w-6 h-6" />
                    ) : (
                      <ImageIcon className="w-6 h-6" />
                    )}
                  </div>
                )}

                <div className="space-y-1.5 min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EADBCB] text-[#C85A32] border border-[#DFCEBA]">
                      {item.file_type === "pdf" ? (
                        <FileText className="w-3 h-3" />
                      ) : (
                        <ImageIcon className="w-3 h-3" />
                      )}
                      {item.file_type === "pdf" ? "PDF" : "Immagine"}
                    </span>

                    {item.is_published ? (
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

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#2C1E16] bg-[#FAF6F0] px-2.5 py-0.5 rounded-full border border-[#DFCEBA]">
                      <Download className="w-3 h-3 text-[#C85A32]" />
                      {item.download_count || 0}{" "}
                      {(item.download_count || 0) === 1
                        ? "download"
                        : "download"}
                    </span>

                    <span className="text-[11px] text-[#8C6D58]">
                      • {formatFileSize(item.file_size_bytes)}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#2C1E16] leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5C4436] line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#F0E4D5] shrink-0">
                {item.is_published && (
                  <a
                    href="/blog?sezione=strumenti"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-[#8C6D58] hover:text-[#2C1E16] hover:bg-[#FAF6F0] rounded-xl border border-transparent hover:border-[#DFCEBA] transition-colors"
                    title="Vedi nel Blog"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <SmartLink
                  href={`/admin/strumenti/modifica/${item.id}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#EADBCB] text-[#2C1E16] hover:bg-[#DFCDBB] transition-colors border border-[#DFCEBA]"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#C85A32]" />
                  <span>Modifica</span>
                </SmartLink>

                <button
                  type="button"
                  onClick={() => handleDelete(item.id, item.title)}
                  disabled={isPending || !tablesReady}
                  className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-xl transition-colors disabled:opacity-40"
                  title="Elimina strumento"
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
