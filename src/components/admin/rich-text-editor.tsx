"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Quote,
  Minus,
  RotateCcw,
  RotateCw,
  RemoveFormatting,
  Heading2,
  Heading3,
  Pilcrow,
  Sparkles,
} from "lucide-react";
import { parseBlogContentToHtml, cleanPastedWordHtml } from "@/lib/content-parser";

interface RichTextEditorProps {
  initialValue?: string;
  onChange?: (html: string) => void;
  name?: string;
}

export function RichTextEditor({
  initialValue = "",
  onChange,
  name = "content",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [contentHtml, setContentHtml] = useState<string>("");
  const [activeBlock, setActiveBlock] = useState<string>("p");
  const isInitialized = useRef(false);

  // Inizializza il contenuto formattato all'avvio
  useEffect(() => {
    if (!isInitialized.current && editorRef.current) {
      const formattedInitial = parseBlogContentToHtml(initialValue);
      editorRef.current.innerHTML = formattedInitial || "<p><br></p>";
      setContentHtml(editorRef.current.innerHTML);
      if (onChange) onChange(editorRef.current.innerHTML);
      isInitialized.current = true;
    }
  }, [initialValue, onChange]);

  const syncContent = useCallback(() => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      setContentHtml(html);
      if (onChange) {
        onChange(html);
      }
    }
  }, [onChange]);

  // Esegue un comando di formattazione standard
  const executeCommand = (command: string, value: string | undefined = undefined) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand(command, false, value);
    syncContent();
  };

  // Gestione stile blocco (Titolo H2, Sottotitolo H3, Paragrafo normale, Citazione)
  const handleBlockFormat = (tag: string) => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    if (tag === "blockquote") {
      document.execCommand("formatBlock", false, "blockquote");
    } else if (tag === "h2") {
      document.execCommand("formatBlock", false, "h2");
    } else if (tag === "h3") {
      document.execCommand("formatBlock", false, "h3");
    } else {
      document.execCommand("formatBlock", false, "p");
    }

    setActiveBlock(tag);
    syncContent();
  };

  // Gestione Incolla da Microsoft Word / Google Docs
  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    e.preventDefault();
    const clipboardData = e.clipboardData;
    const htmlData = clipboardData.getData("text/html");
    const textData = clipboardData.getData("text/plain");

    if (htmlData) {
      const cleaned = cleanPastedWordHtml(htmlData);
      document.execCommand("insertHTML", false, cleaned);
    } else if (textData) {
      // Converte i paragrafi di testo semplice
      const formattedText = textData
        .split(/\n\n+/)
        .map((p) => `<p>${p.trim().replace(/\n/g, "<br>")}</p>`)
        .join("");
      document.execCommand("insertHTML", false, formattedText);
    }

    syncContent();
  };

  return (
    <div className="border border-[#DFCEBA] rounded-2xl overflow-hidden bg-white shadow-xs focus-within:ring-2 focus-within:ring-[#C85A32]/30 focus-within:border-[#C85A32] transition-all">
      {/* Barra degli Strumenti Superiore Stile Word */}
      <div className="bg-[#F7EFE6] border-b border-[#DFCEBA] px-3 py-2 flex flex-wrap items-center gap-1 select-none">
        {/* Scelta Formato Paragrafo / Intestazione */}
        <div className="flex items-center gap-1 bg-white/80 p-1 rounded-lg border border-[#DFCEBA]/80 mr-1">
          <button
            type="button"
            onClick={() => handleBlockFormat("p")}
            className={`px-2 py-1 text-xs font-semibold rounded transition-all flex items-center gap-1 ${
              activeBlock === "p"
                ? "bg-[#EADBCB] text-[#2C1E16]"
                : "text-[#735948] hover:bg-[#FAF6F0] hover:text-[#2C1E16]"
            }`}
            title="Testo Normale / Paragrafo"
          >
            <Pilcrow className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Paragrafo</span>
          </button>

          <button
            type="button"
            onClick={() => handleBlockFormat("h2")}
            className={`px-2 py-1 text-xs font-semibold rounded transition-all flex items-center gap-1 ${
              activeBlock === "h2"
                ? "bg-[#EADBCB] text-[#2C1E16]"
                : "text-[#735948] hover:bg-[#FAF6F0] hover:text-[#2C1E16]"
            }`}
            title="Titolo Principale della sezione (H2)"
          >
            <Heading2 className="w-3.5 h-3.5 text-[#C85A32]" />
            <span className="hidden sm:inline">Titolo H2</span>
          </button>

          <button
            type="button"
            onClick={() => handleBlockFormat("h3")}
            className={`px-2 py-1 text-xs font-semibold rounded transition-all flex items-center gap-1 ${
              activeBlock === "h3"
                ? "bg-[#EADBCB] text-[#2C1E16]"
                : "text-[#735948] hover:bg-[#FAF6F0] hover:text-[#2C1E16]"
            }`}
            title="Sottotitolo della sezione (H3)"
          >
            <Heading3 className="w-3.5 h-3.5 text-[#C85A32]" />
            <span className="hidden sm:inline">Sottotitolo H3</span>
          </button>
        </div>

        {/* Separatore */}
        <div className="w-px h-5 bg-[#DFCEBA] mx-1" />

        {/* Grassetto, Corsivo, Sottolineato */}
        <div className="flex items-center gap-0.5 bg-white/80 p-1 rounded-lg border border-[#DFCEBA]/80">
          <button
            type="button"
            onClick={() => executeCommand("bold")}
            className="p-1.5 text-[#2C1E16] hover:bg-[#EADBCB] rounded transition-colors"
            title="Grassetto (Ctrl+B)"
          >
            <Bold className="w-4 h-4 font-bold" />
          </button>

          <button
            type="button"
            onClick={() => executeCommand("italic")}
            className="p-1.5 text-[#2C1E16] hover:bg-[#EADBCB] rounded transition-colors"
            title="Corsivo (Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => executeCommand("underline")}
            className="p-1.5 text-[#2C1E16] hover:bg-[#EADBCB] rounded transition-colors"
            title="Sottolineato (Ctrl+U)"
          >
            <Underline className="w-4 h-4" />
          </button>
        </div>

        {/* Separatore */}
        <div className="w-px h-5 bg-[#DFCEBA] mx-1" />

        {/* Elenchi & Citazione Kintsugi */}
        <div className="flex items-center gap-0.5 bg-white/80 p-1 rounded-lg border border-[#DFCEBA]/80">
          <button
            type="button"
            onClick={() => executeCommand("insertUnorderedList")}
            className="p-1.5 text-[#2C1E16] hover:bg-[#EADBCB] rounded transition-colors"
            title="Elenco puntato (•)"
          >
            <List className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => executeCommand("insertOrderedList")}
            className="p-1.5 text-[#2C1E16] hover:bg-[#EADBCB] rounded transition-colors"
            title="Elenco numerato (1. 2. 3.)"
          >
            <ListOrdered className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => handleBlockFormat("blockquote")}
            className="p-1.5 text-[#2C1E16] hover:bg-[#EADBCB] rounded transition-colors"
            title="Riquadro Citazione / Pensiero in evidenza"
          >
            <Quote className="w-4 h-4 text-[#C85A32]" />
          </button>

          <button
            type="button"
            onClick={() => executeCommand("insertHorizontalRule")}
            className="p-1.5 text-[#2C1E16] hover:bg-[#EADBCB] rounded transition-colors"
            title="Inserisci linea divisoria"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>

        {/* Separatore */}
        <div className="w-px h-5 bg-[#DFCEBA] mx-1" />

        {/* Pulisci Stili, Annulla, Ripeti */}
        <div className="flex items-center gap-0.5 bg-white/80 p-1 rounded-lg border border-[#DFCEBA]/80">
          <button
            type="button"
            onClick={() => executeCommand("removeFormat")}
            className="p-1.5 text-[#735948] hover:text-[#2C1E16] hover:bg-[#EADBCB] rounded transition-colors"
            title="Rimuovi formattazione"
          >
            <RemoveFormatting className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => executeCommand("undo")}
            className="p-1.5 text-[#735948] hover:text-[#2C1E16] hover:bg-[#EADBCB] rounded transition-colors"
            title="Annulla ultima azione (Ctrl+Z)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => executeCommand("redo")}
            className="p-1.5 text-[#735948] hover:text-[#2C1E16] hover:bg-[#EADBCB] rounded transition-colors"
            title="Ripeti ultima azione (Ctrl+Y)"
          >
            <RotateCw className="w-4 h-4" />
          </button>
        </div>

        {/* Suggerimento visivo "Stile Word" */}
        <div className="ml-auto hidden lg:flex items-center gap-1.5 text-[11px] text-[#8C6D58] italic pr-1">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Editor Stile Word: puoi incollare direttamente da Word o Google Docs</span>
        </div>
      </div>

      {/* Foglio di Scrittura WYSIWYG */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={syncContent}
        onBlur={syncContent}
        onPaste={handlePaste}
        className="min-h-[380px] max-h-[700px] overflow-y-auto p-5 sm:p-8 bg-white focus:outline-none blog-rich-content selection:bg-[#EADBCB] selection:text-[#2C1E16]"
        style={{
          minHeight: "380px",
        }}
      />

      {/* Input nascosto per il payload del form Server Action */}
      <input type="hidden" name={name} value={contentHtml} />
    </div>
  );
}
