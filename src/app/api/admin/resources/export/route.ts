import { NextRequest, NextResponse } from "next/server";
import { verifyAdminSession } from "@/app/actions/admin-blog";
import { getDownloadAnalyticsAdmin } from "@/lib/resources-service";
import { getDownloaderRoleLabel } from "@/lib/resources-data";

function escapeCsvCell(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) return "";
  let str = String(value);
  // Previene CSV formula injection in Excel
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  if (/[",\n\r;]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET(request: NextRequest) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return NextResponse.json(
      { error: "Accesso non autorizzato." },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const daysParam = searchParams.get("days");
  const resourceId = searchParams.get("resourceId") || "all";

  const days: number | "all" =
    daysParam === "7" ? 7 : daysParam === "30" ? 30 : "all";

  const analytics = await getDownloadAnalyticsAdmin({ days, resourceId });

  const header = [
    "Data e ora",
    "Strumento",
    "Ruolo",
    "Email",
    "Consenso aggiornamenti",
    "Provenienza",
    "Articolo collegato",
    "Canale / Referrer",
    "Dispositivo",
    "Città",
    "Paese",
  ];

  const rows = analytics.recentDownloads.map((d) => [
    new Date(d.created_at).toLocaleString("it-IT", {
      timeZone: "Europe/Rome",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    d.resource_title || "",
    getDownloaderRoleLabel(d.downloader_role),
    d.downloader_email || "Anonimo",
    d.marketing_consent ? "Sì" : "No",
    d.source_type === "blog_article" ? "Articolo Blog" : "Catalogo Strumenti",
    d.source_post_slug || "",
    d.referrer || "diretto",
    d.device_type || "desktop",
    d.city || "",
    d.country || "",
  ]);

  // UTF-8 BOM per compatibilità immediata con Microsoft Excel su Windows/Mac
  const csvContent =
    "\uFEFF" +
    [header, ...rows]
      .map((row) => row.map(escapeCsvCell).join(";"))
      .join("\r\n");

  const today = new Date().toISOString().slice(0, 10);

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="statistiche-download-${today}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
