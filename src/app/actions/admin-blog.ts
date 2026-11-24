"use server";

import { createServerClient } from "@/lib/supabase/server";
import {
  checkRateLimit,
  createSignedAdminToken,
  getAllowedAdminEmails,
  resetRateLimit,
  SESSION_COOKIE_NAME,
  SESSION_TTL_SECONDS,
  verifySecretConstantTime,
  verifySignedAdminToken,
} from "@/lib/admin-auth";
import { cookies, headers } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const FALLBACK_ADMIN_PASS = process.env.ADMIN_PASSWORD || "giovanna2026";

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

async function getClientKey(prefix: string): Promise<string> {
  const hdrs = await headers();
  const forwarded = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = hdrs.get("x-real-ip")?.trim();
  return `${prefix}:${forwarded || realIp || "unknown"}`;
}

export async function loginAdminAction(
  _prevState: unknown,
  formData: FormData
) {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString().trim();

  if (!email || !password) {
    return { success: false, error: "Inserisci email e password." };
  }

  // Protezione anti brute-force: max 5 tentativi falliti ogni 15 minuti per IP
  const rateKey = await getClientKey("admin-login");
  const rate = checkRateLimit(rateKey, 5, 15 * 60 * 1000);
  if (!rate.allowed) {
    const minutes = Math.max(1, Math.ceil(rate.retryAfterSeconds / 60));
    return {
      success: false,
      error: `Troppi tentativi falliti. Per sicurezza riprova tra ${minutes} ${minutes === 1 ? "minuto" : "minuti"}.`,
    };
  }

  const allowedEmails = getAllowedAdminEmails();
  const isAllowedEmail = allowedEmails.includes(email);

  // 1. Autenticazione Supabase Auth (solo per email autorizzate)
  if (isAllowedEmail) {
    try {
      const supabase = createServerClient();
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (!authError && authData.user?.email) {
        const signedToken = await createSignedAdminToken(authData.user.email);
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE_NAME, signedToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: SESSION_TTL_SECONDS,
        });
        resetRateLimit(rateKey);
        redirect("/admin");
      }
    } catch (err: unknown) {
      if (
        err instanceof Error &&
        (err.message.includes("NEXT_REDIRECT") ||
          (err as { digest?: string }).digest?.startsWith("NEXT_REDIRECT"))
      ) {
        throw err;
      }
    }

    // 2. Verifica credenziali admin con confronto a tempo costante
    const passwordMatches = await verifySecretConstantTime(
      password,
      FALLBACK_ADMIN_PASS
    );
    if (passwordMatches) {
      const signedToken = await createSignedAdminToken(email);
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE_NAME, signedToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: SESSION_TTL_SECONDS,
      });
      resetRateLimit(rateKey);
      redirect("/admin");
    }
  }

  return {
    success: false,
    error: "Credenziali non valide. Verifica email e password.",
  };
}

/**
 * Logout
 */
export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/admin/login");
}

/**
 * Verifica crittograficamente se la sessione admin è autentica e non scaduta
 */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const rawToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySignedAdminToken(rawToken);
  return session !== null;
}

/**
 * Salvataggio / Modifica Articolo
 */
export async function savePostAction(
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
  const excerpt = formData.get("excerpt")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const read_time =
    formData.get("read_time")?.toString().trim() || "5 min di lettura";
  const cover_image = formData.get("cover_image")?.toString().trim() || null;
  const attached_resource_id =
    formData.get("attached_resource_id")?.toString().trim() || null;
  const is_published =
    formData.get("is_published") === "true" ||
    formData.get("is_published") === "on";

  if (!title || !excerpt || !content || !category) {
    return {
      success: false,
      error:
        "Compila tutti i campi obbligatori (Titolo, Categoria, Riassunto, Contenuto).",
    };
  }

  const slug = formData.get("slug")?.toString().trim() || slugify(title);

  const basePostPayload = {
    title,
    slug,
    excerpt,
    content,
    category,
    read_time,
    cover_image,
    is_published,
    updated_at: new Date().toISOString(),
  };

  const postPayload = {
    ...basePostPayload,
    attached_resource_id,
  };

  try {
    const supabase = createServerClient();

    if (id && !id.startsWith("static-")) {
      let { error } = await supabase
        .from("posts")
        .update(postPayload)
        .eq("id", id);

      if (error && error.message?.includes("attached_resource_id")) {
        const retry = await supabase
          .from("posts")
          .update(basePostPayload)
          .eq("id", id);
        error = retry.error;
      }

      if (error) {
        return {
          success: false,
          error: `Errore durante l'aggiornamento: ${error.message}`,
        };
      }
    } else {
      const nowIso = new Date().toISOString();
      let { error } = await supabase.from("posts").insert({
        ...postPayload,
        published_at: nowIso,
        created_at: nowIso,
      });

      if (error && error.message?.includes("attached_resource_id")) {
        const retry = await supabase.from("posts").insert({
          ...basePostPayload,
          published_at: nowIso,
          created_at: nowIso,
        });
        error = retry.error;
      }

      if (error) {
        return {
          success: false,
          error: `Errore durante il salvataggio: ${error.message}`,
        };
      }
    }

    revalidateTag("posts", { expire: 0 });
    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: "Articolo salvato con successo!", slug };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore inatteso";
    return { success: false, error: `Eccezione nel salvataggio: ${message}` };
  }
}

/**
 * Eliminazione Articolo
 */
export async function deletePostAction(id: string) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { success: false, error: "Non autorizzato." };
  }

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidateTag("posts", { expire: 0 });
    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore inatteso";
    return { success: false, error: message };
  }
}

/**
 * Upload immagine di copertina su Supabase Storage (bucket 'blog-covers')
 */
export async function uploadCoverImageAction(
  formData: FormData
): Promise<{ success: boolean; url?: string; error?: string }> {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { success: false, error: "Non autorizzato. Effettua il login." };
  }

  const file = formData.get("file") as File | null;
  if (!file || !(file instanceof File) || file.size === 0) {
    return { success: false, error: "Nessun file selezionato." };
  }

  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: "Formato non supportato. Usa JPG, PNG o WEBP.",
    };
  }

  if (file.size > 4 * 1024 * 1024) {
    return {
      success: false,
      error: "L'immagine supera il limite massimo di 4MB.",
    };
  }

  try {
    const supabase = createServerClient();
    const bucketName = "blog-covers";

    const { data: buckets } = await supabase.storage.listBuckets();
    if (!buckets?.some((b) => b.name === bucketName)) {
      await supabase.storage.createBucket(bucketName, {
        public: true,
        fileSizeLimit: 5242880,
        allowedMimeTypes: allowedTypes,
      });
    }

    const fileExt =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase()
        .replace(/[^a-z0-9]/g, "") || "jpg";
    const sanitizedName = slugify(file.name.replace(/\.[^/.]+$/, "")) || "cover";
    const filePath = `covers/${Date.now()}-${sanitizedName}.${fileExt}`;

    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: true,
      });

    if (uploadError) {
      return {
        success: false,
        error: `Errore durante il caricamento: ${uploadError.message}`,
      };
    }

    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);

    return { success: true, url: data.publicUrl };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Errore inatteso";
    return { success: false, error: `Errore: ${message}` };
  }
}
