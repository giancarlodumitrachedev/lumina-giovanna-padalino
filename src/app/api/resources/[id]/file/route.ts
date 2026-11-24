import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPublishedResourceById } from "@/lib/resources-service";

function sanitizeDownloadFilename(name: string): string {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const resource = await getPublishedResourceById(id);

  if (!resource) {
    return NextResponse.json(
      { error: "Strumento non trovato." },
      { status: 404 }
    );
  }

  const safeName = sanitizeDownloadFilename(resource.fileName || "strumento.pdf");
  const headers = new Headers({
    "Content-Type": resource.mimeType || "application/pdf",
    "Content-Disposition": `attachment; filename="${safeName}"`,
    "Cache-Control": "public, max-age=3600",
    "X-Content-Type-Options": "nosniff",
  });

  // Caso 1: file locale nella cartella public/Assets/strumenti/
  if (resource.fileUrl.startsWith("/")) {
    const publicRoot = path.resolve(process.cwd(), "public");
    const targetPath = path.resolve(
      publicRoot,
      resource.fileUrl.replace(/^\/+/, "")
    );

    if (!targetPath.startsWith(publicRoot)) {
      return NextResponse.json({ error: "Percorso non valido." }, { status: 400 });
    }

    try {
      const fileBuffer = await readFile(targetPath);
      headers.set("Content-Length", String(fileBuffer.byteLength));
      return new NextResponse(fileBuffer, { status: 200, headers });
    } catch {
      return NextResponse.json(
        { error: "File non disponibile sul server." },
        { status: 404 }
      );
    }
  }

  // Caso 2: file remoto esclusivamente dallo Storage Supabase del progetto (previene SSRF)
  const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");
  const isAllowedRemote =
    supabaseOrigin &&
    resource.fileUrl.startsWith(
      `${supabaseOrigin}/storage/v1/object/public/clinical-resources/`
    );

  if (!isAllowedRemote) {
    return NextResponse.json(
      { error: "Origine file non autorizzata." },
      { status: 403 }
    );
  }

  try {
    const remoteRes = await fetch(resource.fileUrl, { cache: "no-store" });
    if (!remoteRes.ok) {
      return NextResponse.json(
        { error: "Impossibile recuperare il file." },
        { status: 502 }
      );
    }

    const arrayBuffer = await remoteRes.arrayBuffer();
    headers.set("Content-Length", String(arrayBuffer.byteLength));
    return new NextResponse(arrayBuffer, { status: 200, headers });
  } catch {
    return NextResponse.json(
      { error: "Errore nel recupero del file." },
      { status: 502 }
    );
  }
}
