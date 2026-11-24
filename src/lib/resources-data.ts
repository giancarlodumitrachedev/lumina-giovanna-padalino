import type { BlogPost } from "@/lib/blog-data";

export type ResourceFileType = "pdf" | "image";

export type DownloaderRole =
  | "collega"
  | "insegnante"
  | "genitore"
  | "personale"
  | "altro";

export const DOWNLOADER_ROLES: ReadonlyArray<{
  value: DownloaderRole;
  label: string;
  shortLabel: string;
  description: string;
}> = [
  {
    value: "collega",
    label: "Collega / Professionista",
    shortLabel: "Collega",
    description: "Psicologo, pedagogista, educatore o terapista",
  },
  {
    value: "insegnante",
    label: "Insegnante / Scuola",
    shortLabel: "Insegnante",
    description: "Docente, tutor o figura scolastica",
  },
  {
    value: "genitore",
    label: "Genitore / Famiglia",
    shortLabel: "Genitore",
    description: "Supporto a casa con figli o familiari",
  },
  {
    value: "personale",
    label: "Uso personale",
    shortLabel: "Uso personale",
    description: "Percorso di ascolto e consapevolezza personale",
  },
  {
    value: "altro",
    label: "Altro",
    shortLabel: "Altro",
    description: "Studente, curioso o altro ambito",
  },
] as const;

export function getDownloaderRoleLabel(role: string): string {
  return (
    DOWNLOADER_ROLES.find((r) => r.value === role)?.label || "Altro"
  );
}

export function getDownloaderRoleShortLabel(role: string): string {
  return (
    DOWNLOADER_ROLES.find((r) => r.value === role)?.shortLabel || "Altro"
  );
}

export interface DBResource {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: BlogPost["category"];
  file_url: string;
  file_name: string;
  file_type: ResourceFileType;
  mime_type: string;
  file_size_bytes?: number | null;
  preview_image_url?: string | null;
  target_audience?: string | null;
  is_published: boolean;
  download_count: number;
  sort_order?: number;
  created_at?: string;
  updated_at?: string;
}

export interface ClinicalResource {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: BlogPost["category"];
  fileUrl: string;
  fileName: string;
  fileType: ResourceFileType;
  mimeType: string;
  fileSizeBytes: number;
  fileSizeLabel: string;
  previewImageUrl?: string;
  targetAudience: string;
  downloadCount: number;
  createdAt: string;
}

export interface ResourceDownloadRecord {
  id: string;
  resource_id: string;
  resource_title?: string;
  downloader_role: DownloaderRole;
  downloader_email: string | null;
  marketing_consent: boolean;
  source_type: "blog_catalog" | "blog_article";
  source_post_slug: string | null;
  referrer: string | null;
  device_type: "mobile" | "tablet" | "desktop" | null;
  city: string | null;
  country: string | null;
  created_at: string;
}

export interface DownloadAnalyticsSummary {
  totalDownloads: number;
  last7DaysDownloads: number;
  last30DaysDownloads: number;
  colleagueCount: number;
  colleaguePercentage: number;
  emailsCollectedCount: number;
  topResource: { id: string; title: string; count: number } | null;
  dailySeries: Array<{ date: string; label: string; count: number }>;
  roleBreakdown: Array<{
    role: DownloaderRole;
    label: string;
    count: number;
    percentage: number;
  }>;
  sourceBreakdown: Array<{
    label: string;
    detail: string;
    count: number;
    percentage: number;
  }>;
  deviceBreakdown: Array<{
    device: string;
    count: number;
    percentage: number;
  }>;
  topCities: Array<{
    city: string;
    count: number;
  }>;
  recentDownloads: ResourceDownloadRecord[];
  tablesReady: boolean;
}

export function formatFileSize(bytes?: number | null): string {
  if (!bytes || bytes <= 0) return "PDF pronto per la stampa";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1).replace(".", ",")} MB`;
}

export const INITIAL_RESOURCE_ID = "a7e9c410-6b2d-4c8f-9e11-202611240001";

export const fallbackResources: DBResource[] = [
  {
    id: INITIAL_RESOURCE_ID,
    title: "La Mia Mappa Emotiva",
    slug: "la-mia-mappa-emotiva",
    description:
      "Scheda visiva di ascolto e alfabetizzazione emotiva per aiutare bambini, adolescenti e adulti a riconoscere cosa accade nel corpo, l'intensità dell'emozione e i propri bisogni nel momento presente — senza la pressione di dover trovare subito la parola giusta.",
    category: "Psicologia e benessere",
    file_url: "/Assets/strumenti/la-mia-mappa-emotiva.pdf",
    file_name: "La-Mia-Mappa-Emotiva.pdf",
    file_type: "pdf",
    mime_type: "application/pdf",
    file_size_bytes: 107517,
    preview_image_url: "/Assets/strumenti/la-mia-mappa-emotiva-preview.jpg",
    target_audience: "Colleghi, genitori, insegnanti e uso personale",
    is_published: true,
    download_count: 0,
    sort_order: 1,
    created_at: "2026-11-24T10:00:00Z",
    updated_at: "2026-11-24T10:00:00Z",
  },
];
