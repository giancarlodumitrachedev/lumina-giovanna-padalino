import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createServerClient } from "@/lib/supabase/server";
import { getPublishedResourceById } from "@/lib/resources-service";

const downloadPayloadSchema = z.object({
  role: z.enum(["collega", "insegnante", "genitore", "personale", "altro"]),
  email: z
    .string()
    .trim()
    .optional()
    .transform((v) => (v && v.length > 0 ? v.toLowerCase() : null))
    .refine(
      (v) => v === null || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      "Inserisci un indirizzo email valido."
    ),
  marketingConsent: z.boolean().optional().default(false),
  sourceType: z
    .enum(["blog_catalog", "blog_article"])
    .optional()
    .default("blog_catalog"),
  sourcePostSlug: z
    .string()
    .trim()
    .max(200)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null)),
  externalReferrer: z.string().trim().max(300).optional().nullable(),
});

function detectDeviceType(
  userAgent: string | null
): "mobile" | "tablet" | "desktop" {
  if (!userAgent) return "desktop";
  const ua = userAgent.toLowerCase();
  if (/ipad|tablet|playbook|silk|(android(?!.*mobi))/i.test(ua)) {
    return "tablet";
  }
  if (/mobile|iphone|ipod|android|blackberry|iemobile|opera mini/i.test(ua)) {
    return "mobile";
  }
  return "desktop";
}

function normalizeReferrer(raw: string | null | undefined, host: string | null): string {
  if (!raw) return "diretto";
  try {
    const parsed = new URL(raw);
    const hostname = parsed.hostname.replace(/^www\./, "").toLowerCase();
    const currentHost = (host || "").replace(/^www\./, "").split(":")[0].toLowerCase();
    if (!hostname || hostname === currentHost || hostname === "localhost") {
      return "diretto";
    }
    return hostname.slice(0, 120);
  } catch {
    return "diretto";
  }
}

function decodeGeoHeader(value: string | null): string | null {
  if (!value) return null;
  try {
    return decodeURIComponent(value).slice(0, 80);
  } catch {
    return value.slice(0, 80);
  }
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const resource = await getPublishedResourceById(id);

  if (!resource) {
    return NextResponse.json(
      { success: false, error: "Strumento non trovato." },
      { status: 404 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Richiesta non valida." },
      { status: 400 }
    );
  }

  const parsed = downloadPayloadSchema.safeParse(body);
  if (!parsed.success) {
    const firstIssue = parsed.error.issues[0]?.message || "Dati non validi.";
    return NextResponse.json(
      { success: false, error: firstIssue },
      { status: 400 }
    );
  }

  const { role, email, marketingConsent, sourceType, sourcePostSlug, externalReferrer } =
    parsed.data;

  // Se l'utente inserisce un'email, il consenso privacy deve essere esplicito
  if (email && !marketingConsent) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Per lasciare la tua email conferma il consenso all'informativa privacy, oppure lascia il campo vuoto per scaricare comunque.",
      },
      { status: 400 }
    );
  }

  const deviceType = detectDeviceType(request.headers.get("user-agent"));
  const referrer = normalizeReferrer(
    externalReferrer || request.headers.get("referer"),
    request.headers.get("host")
  );
  const city = decodeGeoHeader(request.headers.get("x-vercel-ip-city"));
  const country = decodeGeoHeader(request.headers.get("x-vercel-ip-country"));

  // Tracciamento su Supabase (non blocca mai il download in caso di migrazione non ancora applicata)
  let tracked = false;
  try {
    const supabase = createServerClient();

    const { error: insertError } = await supabase
      .from("resource_downloads")
      .insert({
        resource_id: resource.id,
        downloader_role: role,
        downloader_email: email,
        marketing_consent: Boolean(email && marketingConsent),
        source_type: sourceType,
        source_post_slug: sourcePostSlug,
        referrer,
        device_type: deviceType,
        city,
        country,
      });

    if (!insertError) {
      tracked = true;
      // Aggiorna contatore sulla risorsa
      const { data: currentRow } = await supabase
        .from("resources")
        .select("download_count")
        .eq("id", resource.id)
        .single();

      if (currentRow) {
        await supabase
          .from("resources")
          .update({
            download_count: (currentRow.download_count || 0) + 1,
          })
          .eq("id", resource.id);
      }
    } else {
      console.warn("Tracking download warning:", insertError.message);
    }
  } catch (err) {
    console.warn("Tracking download exception:", err);
  }

  return NextResponse.json({
    success: true,
    tracked,
    downloadUrl: `/api/resources/${encodeURIComponent(resource.id)}/file`,
    fileName: resource.fileName,
  });
}
