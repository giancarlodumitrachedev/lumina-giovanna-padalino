import { unstable_cache } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import {
  ClinicalResource,
  DBResource,
  DownloadAnalyticsSummary,
  fallbackResources,
  formatFileSize,
  ResourceDownloadRecord,
} from "@/lib/resources-data";
import { computeDownloadAnalytics } from "@/lib/resources-analytics";
import { formatItalianDate } from "@/lib/blog-service";

export function mapDBResourceToClinicalResource(
  db: DBResource
): ClinicalResource {
  return {
    id: db.id,
    title: db.title,
    slug: db.slug,
    description: db.description,
    category: db.category,
    fileUrl: db.file_url,
    fileName: db.file_name,
    fileType: db.file_type,
    mimeType: db.mime_type || "application/pdf",
    fileSizeBytes: db.file_size_bytes || 0,
    fileSizeLabel: formatFileSize(db.file_size_bytes),
    previewImageUrl:
      db.preview_image_url ||
      (db.file_type === "image" ? db.file_url : undefined),
    targetAudience:
      db.target_audience || "Colleghi, genitori, insegnanti e uso personale",
    downloadCount: db.download_count || 0,
    createdAt: db.created_at ? formatItalianDate(db.created_at) : "Recente",
  };
}

const fetchPublishedResourcesCached = unstable_cache(
  async (): Promise<ClinicalResource[]> => {
    try {
      const supabase = createServerClient();
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return (data as DBResource[]).map(mapDBResourceToClinicalResource);
      }
    } catch (err) {
      console.warn("Supabase resources fetch warning, usando fallback:", err);
    }

    return fallbackResources.map(mapDBResourceToClinicalResource);
  },
  ["published-resources"],
  { revalidate: 60, tags: ["resources"] }
);

/**
 * Restituisce tutti gli strumenti pubblicati (con cache edge/data 60s + invalidazione immediata su modifica admin)
 */
export async function getPublishedResources(): Promise<ClinicalResource[]> {
  return fetchPublishedResourcesCached();
}

/**
 * Restituisce uno strumento pubblicato per ID (usato per box negli articoli e download)
 */
export async function getPublishedResourceById(
  id: string
): Promise<ClinicalResource | null> {
  if (!id) return null;

  const list = await fetchPublishedResourcesCached();
  const cachedMatch = list.find((r) => r.id === id);
  if (cachedMatch) return cachedMatch;

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("id", id)
      .eq("is_published", true)
      .single();

    if (!error && data) {
      return mapDBResourceToClinicalResource(data as DBResource);
    }
  } catch (err) {
    console.warn("Supabase resource by id warning:", err);
  }

  const fb = fallbackResources.find((r) => r.id === id);
  return fb ? mapDBResourceToClinicalResource(fb) : null;
}

/**
 * Tutti gli strumenti per il Portale Admin (pubblicati + bozze)
 */
export async function getAllResourcesAdmin(): Promise<{
  resources: DBResource[];
  tablesReady: boolean;
}> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (!error && data) {
      return { resources: data as DBResource[], tablesReady: true };
    }
  } catch (err) {
    console.warn("Supabase admin resources fetch warning:", err);
  }

  return { resources: fallbackResources, tablesReady: false };
}

/**
 * Singolo strumento per modifica in /admin
 */
export async function getResourceByIdAdmin(
  id: string
): Promise<DBResource | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      return data as DBResource;
    }
  } catch (err) {
    console.warn("Supabase admin resource by id warning:", err);
  }

  return fallbackResources.find((r) => r.id === id) || null;
}

/**
 * Legge tutti i download recenti in un'unica query (fino a 2000 record) per
 * consentire filtri istantanei a 0ms nella dashboard admin.
 */
export async function getRawDownloadsAdmin(): Promise<{
  downloads: ResourceDownloadRecord[];
  tablesReady: boolean;
}> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("resource_downloads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);

    if (!error && data) {
      return {
        downloads: data as ResourceDownloadRecord[],
        tablesReady: true,
      };
    }
  } catch (err) {
    console.warn("Supabase downloads fetch warning:", err);
  }

  return { downloads: [], tablesReady: false };
}

/**
 * Aggregazione server-side (usata per export CSV filtrato)
 */
export async function getDownloadAnalyticsAdmin(options?: {
  days?: number | "all";
  resourceId?: string;
}): Promise<DownloadAnalyticsSummary> {
  const [{ resources, tablesReady: resReady }, { downloads, tablesReady: dlReady }] =
    await Promise.all([getAllResourcesAdmin(), getRawDownloadsAdmin()]);

  return computeDownloadAnalytics(downloads, resources, {
    days: options?.days ?? 30,
    resourceId: options?.resourceId,
    tablesReady: resReady && dlReady,
  });
}
