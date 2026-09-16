"use server";

import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const SESSION_COOKIE = "lumina_admin_session";
const DEFAULT_ADMIN_EMAIL = "info@giovannapadalino.it";
const DEFAULT_ADMIN_PASS = process.env.ADMIN_PASSWORD || "giovanna2026";

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // rimuove accenti
    .replace(/[^a-z0-9\s-]/g, "") // rimuove caratteri non alfanumerici
    .replace(/[\s_-]+/g, "-") // sostituisce spazi e trattini
    .replace(/^-+|-+$/g, ""); // rimuove trattini all'inizio e alla fine
}

/**
 * Autenticazione Dott.ssa Giovanna Padalino per il portale
 */
export async function loginAdminAction(prevState: any, formData: FormData) {
  const email = formData.get("email")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  if (!email || !password) {
    return { success: false, error: "Inserisci email e password." };
  }

  // 1. Prova autenticazione Supabase Auth
  try {
    const supabase = createServerClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!authError && authData.user) {
      const cookieStore = await cookies();
      cookieStore.set(SESSION_COOKIE, JSON.stringify({ email: authData.user.email, id: authData.user.id }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 giorni
      });
      redirect("/admin");
    }
  } catch (err: any) {
    if (err?.message?.includes("NEXT_REDIRECT")) throw err;
  }

  // 2. Controllo credenziali cliniche predefinite
  if (
    (email.toLowerCase() === DEFAULT_ADMIN_EMAIL.toLowerCase() || email.toLowerCase() === "giovanna.padalino@gmail.com" || email.toLowerCase() === "admin@giovannapadalino.it") &&
    password === DEFAULT_ADMIN_PASS
  ) {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE, JSON.stringify({ email, role: "admin" }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    redirect("/admin");
  }

  return { success: false, error: "Credenziali non valide. Verifica email e password." };
}

/**
 * Logout
 */
export async function logoutAdminAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/**
 * Verifica se l'utente è autenticato
 */
export async function verifyAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(SESSION_COOKIE);
  return !!session?.value;
}

/**
 * Salvataggio / Modifica Articolo
 */
export async function savePostAction(prevState: any, formData: FormData) {
  const isAuth = await verifyAdminSession();
  if (!isAuth) {
    return { success: false, error: "Sessione scaduta. Effettua nuovamente l'accesso." };
  }

  const id = formData.get("id")?.toString().trim();
  const title = formData.get("title")?.toString().trim();
  const excerpt = formData.get("excerpt")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const category = formData.get("category")?.toString().trim();
  const read_time = formData.get("read_time")?.toString().trim() || "5 min di lettura";
  const cover_image = formData.get("cover_image")?.toString().trim() || null;
  const is_published = formData.get("is_published") === "true" || formData.get("is_published") === "on";

  if (!title || !excerpt || !content || !category) {
    return { success: false, error: "Compila tutti i campi obbligatori (Titolo, Categoria, Riassunto, Contenuto)." };
  }

  const slug = formData.get("slug")?.toString().trim() || slugify(title);

  const postPayload = {
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

  try {
    const supabase = createServerClient();

    if (id && !id.startsWith("static-")) {
      // Aggiornamento
      const { error } = await supabase
        .from("posts")
        .update(postPayload)
        .eq("id", id);

      if (error) {
        return { success: false, error: `Errore durante l'aggiornamento: ${error.message}` };
      }
    } else {
      // Creazione
      const { error } = await supabase
        .from("posts")
        .insert({
          ...postPayload,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
        });

      if (error) {
        return { success: false, error: `Errore durante il salvataggio: ${error.message}` };
      }
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true, message: "Articolo salvato con successo!", slug };
  } catch (err: any) {
    return { success: false, error: `Eccezione nel salvataggio: ${err.message}` };
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

    revalidatePath("/blog");
    revalidatePath("/");
    revalidatePath("/admin");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
