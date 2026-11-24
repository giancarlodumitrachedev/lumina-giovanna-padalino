import {
  DBResource,
  DownloadAnalyticsSummary,
  DOWNLOADER_ROLES,
  DownloaderRole,
  ResourceDownloadRecord,
} from "@/lib/resources-data";

/**
 * Funzione pura riutilizzabile sia lato server (CSV export) sia lato client
 * (filtri istantanei a 0ms nella dashboard /admin senza round-trip al server).
 */
export function computeDownloadAnalytics(
  allDownloads: ResourceDownloadRecord[],
  resources: DBResource[],
  options: {
    days: number | "all";
    resourceId?: string;
    tablesReady: boolean;
  }
): DownloadAnalyticsSummary {
  const resourceMap = new Map(resources.map((r) => [r.id, r.title]));
  const resourceFilter =
    options.resourceId && options.resourceId !== "all"
      ? options.resourceId
      : null;

  const now = new Date();
  const cutoffMs =
    options.days === "all"
      ? 0
      : now.getTime() - options.days * 24 * 60 * 60 * 1000;

  const downloads = allDownloads
    .filter((row) => {
      if (resourceFilter && row.resource_id !== resourceFilter) return false;
      if (cutoffMs > 0 && new Date(row.created_at).getTime() < cutoffMs) {
        return false;
      }
      return true;
    })
    .map((row) => ({
      ...row,
      resource_title:
        row.resource_title ||
        resourceMap.get(row.resource_id) ||
        "Strumento rimosso",
    }));

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

  const chartDays = options.days === 7 ? 7 : 14;
  const dailyMap = new Map<string, number>();
  const dailySeries: Array<{ date: string; label: string; count: number }> = [];

  for (let i = chartDays - 1; i >= 0; i--) {
    const dt = new Date(now);
    dt.setDate(dt.getDate() - i);
    dailyMap.set(dt.toISOString().slice(0, 10), 0);
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

  const sourceCounts = new Map<
    string,
    { label: string; detail: string; count: number }
  >();
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
    tablesReady: options.tablesReady,
  };
}
