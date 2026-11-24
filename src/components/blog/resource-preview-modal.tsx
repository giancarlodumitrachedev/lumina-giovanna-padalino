"use client";

import { useEffect, useId, useRef } from "react";
import Image from "next/image";
import { ClinicalResource } from "@/lib/resources-data";
import { X, Download, FileText } from "lucide-react";

interface ResourcePreviewModalProps {
  resource: ClinicalResource | null;
  onClose: () => void;
  onRequestDownload: (resource: ClinicalResource) => void;
}

export function ResourcePreviewModal({
  resource,
  onClose,
  onRequestDownload,
}: ResourcePreviewModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressedOutsideRef = useRef(false);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (resource) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else if (dialog.open) {
      dialog.close();
    }
  }, [resource]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
      onClose();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, [onClose]);

  const isPointerOutside = (
    e: React.PointerEvent<HTMLDialogElement>,
    dialog: HTMLDialogElement
  ) => {
    const rect = dialog.getBoundingClientRect();
    return (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    );
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      pressedOutsideRef.current = isPointerOutside(e, dialog);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (
      !("closedBy" in HTMLDialogElement.prototype) &&
      pressedOutsideRef.current &&
      isPointerOutside(e, dialog)
    ) {
      dialog.close();
    }
    pressedOutsideRef.current = false;
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      {...({ closedby: "any" } as Record<string, string>)}
      className="w-full max-w-3xl rounded-3xl border border-[#DFCEBA] bg-[#FCFAF6] p-0 text-[#2C1E16] shadow-2xl overflow-hidden"
    >
      {resource && (
        <div className="flex flex-col max-h-[90dvh]">
          <div className="kintsugi-line w-full shrink-0" />

          {/* Header */}
          <div className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 border-b border-[#EFE4D6] bg-[#FAF6F0]">
            <div className="min-w-0">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C85A32] block">
                Anteprima strumento •{" "}
                {resource.fileType === "pdf" ? "PDF stampabile" : "Immagine"}
              </span>
              <h1
                id={titleId}
                className="font-heading font-bold text-lg sm:text-xl text-[#2C1E16] truncate"
              >
                {resource.title}
              </h1>
            </div>

            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label="Chiudi anteprima"
              className="w-9 h-9 rounded-full bg-white hover:bg-[#EADBCB] text-[#5C4436] flex items-center justify-center border border-[#DFCEBA] transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body: Anteprima immagine reale o embed PDF */}
          <div className="p-4 sm:p-6 bg-[#F5EBE1]/70 overflow-y-auto flex-1 flex items-center justify-center">
            {resource.previewImageUrl ? (
              <div className="relative w-full max-w-xl aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-[#DFCEBA]">
                <Image
                  src={resource.previewImageUrl}
                  alt={`Anteprima completa di ${resource.title}`}
                  fill
                  className="object-contain p-1 sm:p-2 bg-[#FAF6F0]"
                  sizes="(max-width: 768px) 95vw, 600px"
                />
              </div>
            ) : (
              <div className="w-full max-w-md py-14 px-6 bg-white rounded-2xl border border-[#DFCEBA] text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F5EBE1] text-[#C85A32] flex items-center justify-center">
                  <FileText className="w-7 h-7" />
                </div>
                <p className="font-heading font-bold text-lg text-[#2C1E16]">
                  {resource.fileName}
                </p>
                <p className="text-xs text-[#735948]">
                  Scarica il file per consultarlo e stamparlo in piena qualità.
                </p>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="px-5 sm:px-7 py-4 border-t border-[#EFE4D6] bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-[#735948] text-center sm:text-left">
              {resource.targetAudience} • {resource.fileSizeLabel}
            </p>
            <button
              type="button"
              onClick={() => {
                const selected = resource;
                dialogRef.current?.close();
                setTimeout(() => onRequestDownload(selected), 60);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#C85A32] hover:bg-[#AF4621] text-white text-xs sm:text-sm font-semibold transition-all shadow-sm terracotta-glow"
            >
              <Download className="w-4 h-4" />
              <span>Scarica gratuitamente</span>
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
