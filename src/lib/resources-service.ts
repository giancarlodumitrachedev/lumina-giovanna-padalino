import { createServerClient } from "@/lib/supabase/server";
import {
  ClinicalResource,
  DBResource,
  DownloadAnalyticsSummary,
  DOWNLOADER_ROLES,
  DownloaderRole,
  fallbackResources,
  formatFileSize,
  ResourceDownloadRecord,
} from "@/lib/resources-data";
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

/**
 * Restituisce tutti gli strumenti pubblicati con fallback trasparente
 */
export async function getPublishedResources(): Promise<ClinicalResource[]> {
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
}

/**
 * Restituisce uno strumento pubblicato per ID (usato per box negli articoli e download)
 */
export async function getPublishedResourceById(
  id: string
): Promise<ClinicalResource | null> {
  if (!id) return null;

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
 * Aggrega tutte le statistiche di download per la dashboard privata di /admin
 */
export async function getDownloadAnalyticsAdmin(options?: {
  days?: number | "all";
  resourceId?: string;
}): Promise<DownloadAnalyticsSummary> {
  const days = options?.days ?? 30;
  const resourceFilter =
    options?.resourceId && options.resourceId !== "all"
      ? options.resourceId
      : null;

  const { resources, tablesReady } = await getAllResourcesAdmin();
  const resourceMap = new Map(resources.map((r) => [r.id, r.title]));

  let downloads: ResourceDownloadRecord[] = [];
  let downloadsTableReady = tablesReady;

  try {
    const supabase = createServerClient();
    let query = supabase
      .from("resource_downloads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2000);

    if (resourceFilter) {
      query = query.eq("resource_id", resourceFilter);
    }

    if (days !== "all") {
      const since = new Date();
      since.setDate(since.getDate() - days);
      query = query.gte("created_at", since.toISOString());
    }

    const { data, error } = await query;

    if (!error && data) {
      downloads = (data as ResourceDownloadRecord[]).map((row) => ({
        ...row,
        resource_title:
          resourceMap.get(row.resource_id) || "Strumento rimosso",
      }));
      downloadsTableReady = true;
    } else if (error) {
      downloadsTableReady = false;
    }
  } catch (err) {
    console.warn("Supabase download analytics warning:", err);
    downloadsTableReady = false;
  }

  const now = new Date();
  const ms7Days = 7 * 24 * 60 * 60 * 1000;
  const ms30Days = 30 * 24 * 60 * 60 * 1000;

  const totalDownloads = downloads.length;
  const last7DaysDownloads = downloads.filter(
    (d) => now.getTime() - new Date(d.created_at).getTime() <= ms7Days
  ).length;
  const last30DaysDownloads = downloads.filter(
    (d) => now.getTime() - new Date(d.created_at).getTime() <= ms30Days
  ).length;

  const colleagueCount = downloads.filter(
    (d) => d.downloader_role === "collega"
  ).length;
  const colleaguePercentage =
    totalDownloads > 0
      ? Math.round((colleagueCount / totalDownloads) * 100)
      : 0;

  const uniqueEmails = new Set(
    downloads
      .map((d) => d.downloader_email?.trim().toLowerCase())
      .filter(Boolean)
  );
  const emailsCollectedCount = uniqueEmails.size;

  // Top resource
  const resourceCounts = new Map<string, number>();
  for (const d of downloads) {
    resourceCounts.set(
      d.resource_id,
      (resourceCounts.get(d.resource_id) || 0) + 1
    );
  }
  let topResource: { id: string; title: string; count: number } | null = null;
  for (const [resId, count] of resourceCounts.entries()) {
    if (!topResource || count > topResource.count) {
      topResource = {
        id: resId,
        title: resourceMap.get(resId) || "Strumento",
        count,
      };
    }
  }

  // Serie giornaliera (ultimi 14 giorni se filtro 7/30, o ultimi 14 se "all")
  const chartDays = days === 7 ? 7 : 14;
  const dailyMap = new Map<string, number>();
  const dailySeries: Array<{ date: string; label: string; count: number }> = [];

  for (let i = chartDays - 1; i >= 0; i--) {
    const dt = new Date(now);
    dt.setDate(dt.getDate() - i);
    const key = dt.toISOString().slice(0, 10);
    dailyMap.set(key, 0);
  }

  for (const d of downloads) {
    const key = d.created_at.slice(0, 10);
    if (dailyMap.has(key)) {
      dailyMap.set(key, (dailyMap.get(key) || 0) + 1);
    }
  }

  for (const [date, count] of dailyMap.entries()) {
    const dt = new Date(`${date}T12:00:00Z`);
    const label = dt.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "short",
    });
    dailySeries.push({ date, label, count });
  }

  // Distribuzione per ruolo
  const roleCounts = new Map<DownloaderRole, number>();
  for (const d of downloads) {
    roleCounts.set(
      d.downloader_role,
      (roleCounts.get(d.downloader_role) || 0) + 1
    );
  }
  const roleBreakdown = DOWNLOADER_ROLES.map((r) => {
    const count = roleCounts.get(r.value) || 0;
    return {
      role: r.value,
      label: r.label,
      count,
      percentage:
        totalDownloads > 0 ? Math.round((count / totalDownloads) * 100) : 0,
    };
  }).sort((a, b) => b.count - a.count);

  // Provenienza (Catalogo Blog vs Articoli vs Referrer esterno)
  const sourceCounts = new Map<string, { label: string; detail: string; count: number }>();
  for (const d of downloads) {
    let key: string;
    let label: string;
    let detail: string;

    if (d.source_type === "blog_article" && d.source_post_slug) {
      key = `article:${d.source_post_slug}`;
      label = "Articolo del Blog";
      detail = d.source_post_slug.replace(/-/g, " ");
    } else if (d.referrer && d.referrer !== "diretto") {
      key = `ref:${d.referrer}`;
      label = d.referrer;
      detail = "Accesso da canale esterno";
    } else {
      key = "catalog:blog";
      label = "Catalogo Strumenti (/blog)";
      detail = "Accesso diretto dal sito";
    }

    const existing = sourceCounts.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      sourceCounts.set(key, { label, detail, count: 1 });
    }
  }

  const sourceBreakdown = Array.from(sourceCounts.values())
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)
    .map((s) => ({
      ...s,
      percentage:
        totalDownloads > 0 ? Math.round((s.count / totalDownloads) * 100) : 0,
    }));

  // Dispositivi
  const deviceCounts = new Map<string, number>();
  for (const d of downloads) {
    const dev =
      d.device_type === "mobile"
        ? "Smartphone"
        : d.device_type === "tablet"
        ? "Tablet"
        : "Computer";
    deviceCounts.set(dev, (deviceCounts.get(dev) || 0) + 1);
  }
  const deviceBreakdown = Array.from(deviceCounts.entries())
    .map(([device, count]) => ({
      device,
      count,
      percentage:
        totalDownloads > 0 ? Math.round((count / totalDownloads) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Città
  const cityCounts = new Map<string, number>();
  for (const d of downloads) {
    if (d.city) {
      const label = d.country ? `${d.city} (${d.country})` : d.city;
      cityCounts.set(label, (cityCounts.get(label) || 0) + 1);
    }
  }
  const topCities = Array.from(cityCounts.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalDownloads,
    last7DaysDownloads,
    last30DaysDownloads,
    colleagueCount,
    colleaguePercentage,
    emailsCollectedCount,
    topResource,
    dailySeries,
    roleBreakdown,
    sourceBreakdown,
    deviceBreakdown,
    topCities,
    recentDownloads: downloads.slice(0, 100),
    tablesReady: downloadsTableReady,
  };
}
