import { marked } from "marked";

// Configurazione marked con compatibilità GitHub Flavored Markdown e interruzioni di riga
marked.setOptions({
  gfm: true,
  breaks: true,
});

/**
 * Converte qualsiasi contenuto blog (Markdown, HTML stile Word o testo piano)
 * in HTML semantico formattato per la visualizzazione.
 */
export function parseBlogContentToHtml(raw: string | string[] | undefined | null): string {
  if (!raw) return "";

  const contentStr = Array.isArray(raw) ? raw.join("\n\n") : raw;

  // Riconosce la presenza di elementi Markdown
  const hasMarkdownPatterns = /(^|\n)(#{1,6}\s|\*\*.+\*\*|\*|_|`|- \s|\d+\.\s|> )/m.test(contentStr);

  if (hasMarkdownPatterns) {
    try {
      return marked.parse(contentStr) as string;
    } catch {
      // Fallback
    }
  }

  // Verifica se è già HTML formattato (es. dall'editor visuale Stile Word)
  const hasHtml = /<(p|h[1-6]|ul|ol|li|blockquote|strong|b|em|i|u|hr)[^>]*>/i.test(contentStr);
  if (hasHtml) {
    return contentStr;
  }

  // Testo semplice con a capo
  return contentStr
    .split(/\n\n+/)
    .map((paragraph) => `<p>${paragraph.trim().replace(/\n/g, "<br />")}</p>`)
    .join("");
}

/**
 * Pulisce l'HTML incollato da Microsoft Word, Apple Pages o Google Docs
 * rimuovendo classi proprietary e preservando la struttura essenziale
 * (titoli, paragrafi, grassetto, corsivo, elenchi).
 */
export function cleanPastedWordHtml(html: string): string {
  if (!html) return "";

  let clean = html;

  // Rimuove commenti condizionali di Word (<!--[if ...]>...<![endif]-->)
  clean = clean.replace(/<!--[\s\S]*?-->/gi, "");

  // Rimuove tag XML di Office (<o:p>, <w:WordDocument>, ecc.)
  clean = clean.replace(/<\/?\w+:[^>]*>/gi, "");

  // Rimuove stili inline mso-*
  clean = clean.replace(/style="[^"]*mso-[^"]*"/gi, "");

  // Rimuove classi Word (class="MsoNormal", class="MsoListParagraph", ecc.)
  clean = clean.replace(/class="Mso[^"]*"/gi, "");

  // Converte span inutili senza attributi
  clean = clean.replace(/<span>(.*?)<\/span>/gi, "$1");

  return clean;
}
