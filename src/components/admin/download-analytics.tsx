"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  DBResource,
  DownloadAnalyticsSummary,
  getDownloaderRoleShortLabel,
} from "@/lib/resources-data";
import {
  Download,
  Users,
  Mail,
  Award,
  FileDown,
  Search,
  Smartphone,
  Monitor,
  Tablet,
  MapPin,
  Globe,
  AlertCircle,
} from "lucide-react";

interface AdminDownloadAnalyticsProps {
  analytics: DownloadAnalyticsSummary;
  resources: DBResource[];
  selectedDays: "7" | "30" | "all";
  selectedResourceId: string;
}

const ROLE_BADGE_STYLES: Record<string, string> = {
  collega: "bg-[#C85A32]/12 text-[#A03E1C] border-[#C85A32]/30 font-semibold",
  insegnante: "bg-amber-50 text-amber-800 border-amber-200",
  genitore: "bg-emerald-50 text-emerald-800 border-emerald-200",
  personale: "bg-[#EADBCB]/70 text-[#5C4436] border-[#DFCEBA]",
  altro: "bg-stone-100 text-stone-700 border-stone-200",
};

export function AdminDownloadAnalytics({
  analytics,
  resources,
  selectedDays,
  selectedResourceId,
}: AdminDownloadAnalyticsProps) {
  const router = useRouter();
  const [logSearch, setLogSearch] = useState("");

  const updateFilter = (nextDays: string, nextResourceId: string) => {
    const params = new URLSearchParams();
    params.set("tab", "statistiche");
    params.set("days", nextDays);
    if (nextResourceId && nextResourceId !== "all") {
      params.set("resourceId", nextResourceId);
    }
    router.push(`/admin?${params.toString()}`);
  };

  const maxDailyCount = useMemo(() => {
    return Math.max(1, ...analytics.dailySeries.map((d) => d.count));
  }, [analytics.dailySeries]);

  const filteredLogs = useMemo(() => {
    const q = logSearch.trim().toLowerCase();
    if (!q) return analytics.recentDownloads;
    return analytics.recentDownloads.filter((row) => {
      return (
        (row.resource_title || "").toLowerCase().includes(q) ||
        getDownloaderRoleShortLabel(row.downloader_role)
          .toLowerCase()
          .includes(q) ||
        (row.downloader_email || "").toLowerCase().includes(q) ||
        (row.city || "").toLowerCase().includes(q) ||
        (row.referrer || "").toLowerCase().includes(q)
      );
    });
  }, [analytics.recentDownloads, logSearch]);

  const csvExportUrl = `/api/admin/resources/export?days=${encodeURIComponent(
    selectedDays
  )}&resourceId=${encodeURIComponent(selectedResourceId)}`;

  return (
    <div className="space-y-6">
      {!analytics.tablesReady && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">
              Tracciamento statistiche pronto per l&apos;attivazione su Supabase
            </p>
            <p className="text-xs text-amber-800 mt-0.5 leading-relaxed">
              Esegui la migrazione SQL{" "}
              <code className="bg-amber-100 px-1.5 py-0.5 rounded">
                supabase/migrations/20261124_create_resources_tables.sql
              </code>{" "}
              nel SQL Editor di Supabase per iniziare a visualizzare qui i
              download in tempo reale.
            </p>
          </div>
        </div>
      )}

      {/* Barra Filtri Periodo, Strumento ed Export CSV */}
      <div className="bg-white/95 p-4 sm:p-5 rounded-2xl border border-[#DFCEBA] shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-[#735948] mr-1">
            Periodo:
          </span>
          {(
            [
              { value: "7", label: "Ultimi 7 giorni" },
              { value: "30", label: "Ultimi 30 giorni" },
              { value: "all", label: "Tutto lo storico" },
            ] as const
          ).map((period) => (
            <button
              key={period.value}
              type="button"
              onClick={() => updateFilter(period.value, selectedResourceId)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedDays === period.value
                  ? "bg-[#C85A32] text-white shadow-2xs"
                  : "bg-[#FAF6F0] text-[#5C4436] border border-[#DFCEBA] hover:bg-[#EADBCB]/60"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedResourceId}
            onChange={(e) => updateFilter(selectedDays, e.target.value)}
            aria-label="Filtra per strumento"
            className="px-3.5 py-2 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-xs font-medium text-[#2C1E16] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30"
          >
            <option value="all">Tutti gli strumenti</option>
            {resources.map((r) => (
              <option key={r.id} value={r.id}>
                {r.title}
              </option>
            ))}
          </select>

          <a
            href={csvExportUrl}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-[#EADBCB] hover:bg-[#DFCDBB] text-[#2C1E16] border border-[#DFCEBA] transition-colors"
          >
            <FileDown className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Esporta CSV</span>
          </a>
        </div>
      </div>

      {/* 4 Card KPI */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/95 p-5 rounded-2xl border border-[#DFCEBA] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D58]">
              Download nel periodo
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F5EBE1] text-[#C85A32] flex items-center justify-center">
              <Download className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-heading font-bold text-[#2C1E16]">
            {analytics.totalDownloads}
          </p>
          <p className="text-[11px] text-[#735948] mt-1">
            {analytics.last7DaysDownloads} negli ultimi 7 giorni
          </p>
        </div>

        <div className="bg-white/95 p-5 rounded-2xl border border-[#C85A32]/35 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#C85A32]">
              Colleghi &amp; Professionisti
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#C85A32]/10 text-[#C85A32] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-heading font-bold text-[#2C1E16]">
            {analytics.colleaguePercentage}%
          </p>
          <p className="text-[11px] text-[#735948] mt-1">
            {analytics.colleagueCount}{" "}
            {analytics.colleagueCount === 1
              ? "collega ha scaricato"
              : "colleghi hanno scaricato"}
          </p>
        </div>

        <div className="bg-white/95 p-5 rounded-2xl border border-[#DFCEBA] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D58]">
              Contatti Email Raccolti
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F5EBE1] text-[#C59B27] flex items-center justify-center">
              <Mail className="w-4 h-4" />
            </div>
          </div>
          <p className="text-3xl font-heading font-bold text-[#2C1E16]">
            {analytics.emailsCollectedCount}
          </p>
          <p className="text-[11px] text-[#735948] mt-1">
            Email uniche con consenso
          </p>
        </div>

        <div className="bg-white/95 p-5 rounded-2xl border border-[#DFCEBA] shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D58]">
              Più Scaricato
            </span>
            <div className="w-9 h-9 rounded-xl bg-[#F5EBE1] text-[#C59B27] flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <p className="text-base font-heading font-bold text-[#2C1E16] line-clamp-1">
            {analytics.topResource?.title || "Nessun dato"}
          </p>
          <p className="text-[11px] text-[#735948] mt-1">
            {analytics.topResource
              ? `${analytics.topResource.count} download registrati`
              : "In attesa dei primi download"}
          </p>
        </div>
      </div>

      {/* Grafico Andamento Giornaliero */}
      <div className="bg-white/95 p-5 sm:p-6 rounded-2xl border border-[#DFCEBA] shadow-xs">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#2C1E16]">
              Andamento giornaliero
            </h3>
            <p className="text-xs text-[#735948]">
              Download registrati giorno per giorno (ultimi{" "}
              {analytics.dailySeries.length} giorni)
            </p>
          </div>
        </div>

        <div className="flex items-end gap-1.5 sm:gap-2.5 h-44 pt-4">
          {analytics.dailySeries.map((point) => {
            const heightPct =
              point.count === 0
                ? 6
                : Math.max(14, Math.round((point.count / maxDailyCount) * 100));
            return (
              <div
                key={point.date}
                className="flex-1 flex flex-col items-center gap-2 h-full justify-end group"
              >
                <span className="text-[10px] font-semibold text-[#C85A32] opacity-80 group-hover:opacity-100">
                  {point.count > 0 ? point.count : ""}
                </span>
                <div className="w-full flex-1 flex items-end">
                  <div
                    style={{ height: `${heightPct}%` }}
                    title={`${point.label}: ${point.count} download`}
                    className={`w-full rounded-t-lg transition-all ${
                      point.count > 0
                        ? "bg-[#C85A32] group-hover:bg-[#AF4621]"
                        : "bg-[#EFE4D6]"
                    }`}
                  />
                </div>
                <span className="text-[10px] text-[#8C6D58] whitespace-nowrap">
                  {point.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Distribuzione Ruoli + Provenienza & Dispositivi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chi ha scaricato */}
        <div className="bg-white/95 p-5 sm:p-6 rounded-2xl border border-[#DFCEBA] shadow-xs space-y-4">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#2C1E16]">
              Chi sta scaricando?
            </h3>
            <p className="text-xs text-[#735948]">
              Ripartizione per profilo selezionato prima del download
            </p>
          </div>

          <div className="space-y-3.5">
            {analytics.roleBreakdown.map((item) => (
              <div key={item.role} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={
                      item.role === "collega"
                        ? "font-semibold text-[#C85A32]"
                        : "font-medium text-[#2C1E16]"
                    }
                  >
                    {item.label}
                  </span>
                  <span className="text-[#735948]">
                    <strong className="text-[#2C1E16]">{item.count}</strong> (
                    {item.percentage}%)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#F5EBE1] overflow-hidden">
                  <div
                    style={{ width: `${item.percentage}%` }}
                    className={`h-full rounded-full transition-all ${
                      item.role === "collega"
                        ? "bg-[#C85A32]"
                        : "bg-[#C59B27]/75"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Provenienza, Dispositivi & Città */}
        <div className="bg-white/95 p-5 sm:p-6 rounded-2xl border border-[#DFCEBA] shadow-xs space-y-5">
          <div>
            <h3 className="font-heading font-bold text-lg text-[#2C1E16]">
              Da dove arrivano
            </h3>
            <p className="text-xs text-[#735948]">
              Sezione del blog, articoli collegati, dispositivi e area geografica
            </p>
          </div>

          {analytics.sourceBreakdown.length === 0 ? (
            <p className="text-xs text-[#8C6D58] italic py-4">
              Nessun download registrato nel periodo selezionato.
            </p>
          ) : (
            <div className="space-y-2.5">
              {analytics.sourceBreakdown.map((src, i) => (
                <div
                  key={`${src.label}-${i}`}
                  className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-[#FAF6F0] border border-[#EFE4D6]"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#2C1E16] truncate">
                      {src.label}
                    </p>
                    <p className="text-[11px] text-[#8C6D58] truncate capitalize">
                      {src.detail}
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-[#C85A32] shrink-0">
                    {src.count} ({src.percentage}%)
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Dispositivi + Città */}
          <div className="pt-3 border-t border-[#F0E4D5] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D58] block mb-2">
                Dispositivi
              </span>
              {analytics.deviceBreakdown.length === 0 ? (
                <p className="text-xs text-[#8C6D58]">—</p>
              ) : (
                <div className="space-y-1.5">
                  {analytics.deviceBreakdown.map((d) => (
                    <div
                      key={d.device}
                      className="flex items-center justify-between text-xs text-[#5C4436]"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        {d.device === "Smartphone" ? (
                          <Smartphone className="w-3.5 h-3.5 text-[#C85A32]" />
                        ) : d.device === "Tablet" ? (
                          <Tablet className="w-3.5 h-3.5 text-[#C85A32]" />
                        ) : (
                          <Monitor className="w-3.5 h-3.5 text-[#C85A32]" />
                        )}
                        {d.device}
                      </span>
                      <span className="font-semibold text-[#2C1E16]">
                        {d.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8C6D58] block mb-2">
                Città principali
              </span>
              {analytics.topCities.length === 0 ? (
                <p className="text-xs text-[#8C6D58]">
                  Disponibile online su Vercel
                </p>
              ) : (
                <div className="space-y-1.5">
                  {analytics.topCities.map((c) => (
                    <div
                      key={c.city}
                      className="flex items-center justify-between text-xs text-[#5C4436]"
                    >
                      <span className="inline-flex items-center gap-1.5 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                        <span className="truncate">{c.city}</span>
                      </span>
                      <span className="font-semibold text-[#2C1E16] shrink-0">
                        {c.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Registro Download Recenti (Tabella Responsive con Container Query) */}
      <div className="bg-white/95 rounded-2xl border border-[#DFCEBA] shadow-xs overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-[#EFE4D6] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3
              id="recent-downloads-caption"
              className="font-heading font-bold text-lg text-[#2C1E16]"
            >
              Registro download recenti
            </h3>
            <p className="text-xs text-[#735948]">
              Dettaglio cronologico dei download (ultimi {filteredLogs.length})
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8C6D58]" />
            <input
              type="text"
              value={logSearch}
              onChange={(e) => setLogSearch(e.target.value)}
              placeholder="Cerca ruolo, email, città..."
              className="w-full pl-9 pr-3 py-2 bg-[#FAF6F0] border border-[#DFCEBA] rounded-xl text-xs text-[#2C1E16] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30"
            />
          </div>
        </div>

        {filteredLogs.length === 0 ? (
          <div className="p-10 text-center text-xs sm:text-sm text-[#8C6D58]">
            Nessun download registrato con i filtri selezionati.
          </div>
        ) : (
          <div
            tabIndex={0}
            role="region"
            aria-labelledby="recent-downloads-caption"
            className="analytics-table-wrapper p-4 sm:p-0"
          >
            <table className="analytics-table text-left text-xs">
              <thead>
                <tr className="bg-[#FAF6F0] text-[#735948] uppercase tracking-wider text-[10.5px]">
                  <th scope="col" className="px-5 py-3.5 border-b border-[#EFE4D6] font-semibold">
                    Data e ora
                  </th>
                  <th scope="col" className="px-4 py-3.5 border-b border-[#EFE4D6] font-semibold">
                    Strumento
                  </th>
                  <th scope="col" className="px-4 py-3.5 border-b border-[#EFE4D6] font-semibold">
                    Profilo
                  </th>
                  <th scope="col" className="px-4 py-3.5 border-b border-[#EFE4D6] font-semibold">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3.5 border-b border-[#EFE4D6] font-semibold">
                    Provenienza
                  </th>
                  <th scope="col" className="px-4 py-3.5 border-b border-[#EFE4D6] font-semibold">
                    Dispositivo / Area
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0E4D5]">
                {filteredLogs.map((row) => {
                  const formattedDate = new Date(row.created_at).toLocaleString(
                    "it-IT",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );

                  return (
                    <tr
                      key={row.id}
                      className="hover:bg-[#FAF6F0]/70 transition-colors"
                    >
                      <th
                        scope="row"
                        className="px-5 py-3.5 font-medium text-[#2C1E16] whitespace-nowrap"
                      >
                        {formattedDate}
                      </th>
                      <td
                        data-label="Strumento"
                        className="px-4 py-3.5 font-medium text-[#2C1E16]"
                      >
                        {row.resource_title}
                      </td>
                      <td data-label="Profilo" className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] border ${
                            ROLE_BADGE_STYLES[row.downloader_role] ||
                            ROLE_BADGE_STYLES.altro
                          }`}
                        >
                          {getDownloaderRoleShortLabel(row.downloader_role)}
                        </span>
                      </td>
                      <td
                        data-label="Email"
                        className="px-4 py-3.5 text-[#5C4436]"
                      >
                        {row.downloader_email ? (
                          <a
                            href={`mailto:${row.downloader_email}`}
                            className="text-[#C85A32] hover:underline font-medium"
                          >
                            {row.downloader_email}
                          </a>
                        ) : (
                          <span className="text-[#A68875] italic">Anonimo</span>
                        )}
                      </td>
                      <td
                        data-label="Provenienza"
                        className="px-4 py-3.5 text-[#5C4436]"
                      >
                        {row.source_type === "blog_article" &&
                        row.source_post_slug ? (
                          <span className="inline-flex items-center gap-1">
                            Articolo:{" "}
                            <span className="font-medium text-[#2C1E16] truncate max-w-[160px] inline-block align-bottom">
                              {row.source_post_slug}
                            </span>
                          </span>
                        ) : row.referrer && row.referrer !== "diretto" ? (
                          <span className="inline-flex items-center gap-1">
                            <Globe className="w-3 h-3 text-[#8C6D58]" />
                            {row.referrer}
                          </span>
                        ) : (
                          "Catalogo Blog"
                        )}
                      </td>
                      <td
                        data-label="Dispositivo"
                        className="px-4 py-3.5 text-[#735948] whitespace-nowrap"
                      >
                        <span className="capitalize">
                          {row.device_type || "desktop"}
                        </span>
                        {row.city ? ` • ${row.city}` : ""}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
