"use server";

import { createServerClient } from "@/lib/supabase/server";
import { verifyAdminSession } from "@/app/actions/admin-blog";
import { revalidatePath, revalidateTag } from "next/cache";

const BUCKET_NAME = "clinical-resources";
const MAX_FILE_SIZE_BYTES = 15 * 1024 * 1024; // 15 MB
const ALLOWED_RESOURCE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
const ALLOWED_PREVIEW_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Genera una Signed Upload URL su Supabase Storage per consentire upload diretti
 * dal browser fino a 15MB (evitando il limite di 4.5MB delle Serverless Function Vercel)
 */
export async function createResourceUploadUrlAction(params: {
  fileName: string;
  contentType: string;
  fileSize: number;
  kind: "resource" | "preview";
}): Promise<{
  success: boolean;
  path?: string;
  token?: string;
  publicUrl?: string;
  error?: string;
}> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return {
      success: false,
      error: "Sessione non valida. Effettua di nuovo l'accesso.",
    };
  }

  const allowed =
    params.kind === "preview" ? ALLOWED_PREVIEW_TYPES : ALLOWED_RESOURCE_TYPES;

  if (!allowed.includes(params.contentType)) {
    return {
      success: false,
      error:
        params.kind === "preview"
          ? "Formato anteprima non supportato. Usa JPG, PNG o WEBP."
          : "Formato file non supportato. Carica un PDF oppure un'immagine (JPG, PNG, WEBP).",
    };
  }

  const limit = params.kind === "preview" ? 5 * 1024 * 1024 : MAX_FILE_SIZE_BYTES;
  if (params.fileSize > limit) {
    return {
      success: false,
      error:
        params.kind === "preview"
          ? "L'immagine di anteprima supera i 5 MB."
          : "Il file supera il limite massimo di 15 MB.",
    };
  }

  try {
    const supabase = createServerClient();

    // Assicura l'esistenza del bucket
    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.some((b) => b.name === BUCKET_NAME)) {
      await supabase.storage.createBucket(BUCKET_NAME, {
        public: true,
        fileSizeLimit: MAX_FILE_SIZE_BYTES,
        allowedMimeTypes: ALLOWED_RESOURCE_TYPES,
      });
    }

    const ext =
      params.fileName.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") ||
      (params.contentType === "application/pdf" ? "pdf" : "png");
    const base =
      slugify(params.fileName.replace(/\.[^/.]+$/, "")) || "strumento";
    const folder = params.kind === "preview" ? "previews" : "files";
    const storagePath = `${folder}/${Date.now()}-${base}.${ext}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .createSignedUploadUrl(storagePath);

    if (error || !data) {
      return {
        success: false,
        error: `Impossibile preparare l'upload: ${error?.message || "errore sconosciuto"}`,
      };
    }

    const { data: publicData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(storagePath);

    return {
      success: true,
      path: data.path,
      token: data.token,
      publicUrl: publicData.publicUrl,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore inatteso";
    return { success: false, error: `Errore: ${message}` };
  }
}

/**
 * Crea o aggiorna uno strumento scaricabile (PDF o immagine)
 */
export async function saveResourceAction(
  _prevState: unknown,
  formData: FormData
) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return {
      success: false,
      error: "Sessione scaduta. Effettua nuovamente l'accesso.",
    };
  }

  const id = formData.get("id")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const target_audience =
    formData.get("target_audience")?.toString().trim() ||
    "Colleghi, genitori, insegnanti e uso personale";
  const file_url = formData.get("file_url")?.toString().trim();
  const file_name = formData.get("file_name")?.toString().trim();
  const file_type =
    formData.get("file_type")?.toString().trim() === "image" ? "image" : "pdf";
  const mime_type =
    formData.get("mime_type")?.toString().trim() ||
    (file_type === "pdf" ? "application/pdf" : "image/png");
  const file_size_bytes = Number(formData.get("file_size_bytes") || 0) || 0;
  const preview_image_url =
    formData.get("preview_image_url")?.toString().trim() || null;
  const is_published =
    formData.get("is_published") === "true" ||
    formData.get("is_published") === "on";

  if (!title || !description || !category) {
    return {
      success: false,
      error: "Compila titolo, categoria e descrizione dello strumento.",
    };
  }

  if (!file_url || !file_name) {
    return {
      success: false,
      error: "Carica prima il file PDF o l'immagine scaricabile.",
    };
  }

  // Validazione origine URL file (solo asset locali o bucket clinical-resources del progetto)
  const supabaseOrigin = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/+$/, "");
  const isValidUrl = (url: string) =>
    url.startsWith("/Assets/") ||
    Boolean(
      supabaseOrigin &&
        url.startsWith(
          `${supabaseOrigin}/storage/v1/object/public/clinical-resources/`
        )
    );

  if (!isValidUrl(file_url)) {
    return {
      success: false,
      error: "Origine del file non consentita.",
    };
  }
  if (preview_image_url && !isValidUrl(preview_image_url)) {
    return {
      success: false,
      error: "Origine dell'immagine di anteprima non consentita.",
    };
  }

  const slug = formData.get("slug")?.toString().trim() || slugify(title);

  const payload = {
    title,
    slug,
    description,
    category,
    target_audience,
    file_url,
    file_name,
    file_type,
    mime_type,
    file_size_bytes,
    preview_image_url:
      preview_image_url || (file_type === "image" ? file_url : null),
    is_published,
    updated_at: new Date().toISOString(),
  };

  try {
    const supabase = createServerClient();

    if (id) {
      const { error } = await supabase
        .from("resources")
        .update(payload)
        .eq("id", id);

      if (error) {
        return {
          success: false,
          error: `Errore durante l'aggiornamento: ${error.message}`,
        };
      }
    } else {
      const { error } = await supabase.from("resources").insert({
        ...payload,
        created_at: new Date().toISOString(),
      });

      if (error) {
        return {
          success: false,
          error: `Errore durante il salvataggio: ${error.message}`,
        };
      }
    }

    revalidateTag("resources", { expire: 0 });
    revalidatePath("/blog");
    revalidatePath("/admin");

    return {
      success: true,
      message: "Strumento salvato correttamente!",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return {
      success: false,
      error: `Eccezione durante il salvataggio: ${message}`,
    };
  }
}

/**
 * Elimina uno strumento scaricabile
 */
export async function deleteResourceAction(id: string) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { success: false, error: "Non autorizzato." };
  }

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from("resources").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidateTag("resources", { expire: 0 });
    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore sconosciuto";
    return { success: false, error: message };
  }
}
