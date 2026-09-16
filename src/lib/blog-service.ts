import { createServerClient } from "@/lib/supabase/server";
import { blogPosts, BlogPost } from "@/lib/blog-data";

export interface DBPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: BlogPost["category"];
  read_time?: string;
  cover_image?: string;
  is_published: boolean;
  published_at: string;
  created_at?: string;
  updated_at?: string;
}

export function formatItalianDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function mapDBPostToBlogPost(dbPost: DBPost): BlogPost {
  return {
    slug: dbPost.slug,
    title: dbPost.title,
    excerpt: dbPost.excerpt,
    category: dbPost.category,
    readTime: dbPost.read_time || "5 min di lettura",
    date: formatItalianDate(dbPost.published_at),
    author: "Dott.ssa Giovanna Padalino",
    content: dbPost.content,
    image: dbPost.cover_image,
  };
}

/**
 * Ottiene tutti i post pubblicati da Supabase con fallback trasparente sui dati statici
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (!error && data && data.length > 0) {
      return data.map(mapDBPostToBlogPost);
    }
  } catch (err) {
    console.warn("Supabase fetch warning, usando dati statici di fallback:", err);
  }

  return blogPosts;
}

/**
 * Ottiene un singolo articolo per slug da Supabase o dal fallback
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (!error && data) {
      return mapDBPostToBlogPost(data);
    }
  } catch (err) {
    console.warn("Supabase post by slug warning, cercando nei dati statici:", err);
  }

  return blogPosts.find((p) => p.slug === slug);
}

/**
 * Ottiene tutti i post per il pannello di controllo Admin (inclusi bozze e pubblicati)
 */
export async function getAllPostsAdmin(): Promise<DBPost[]> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.warn("Supabase admin fetch warning:", err);
  }

  // Fallback se la tabella non è ancora stata creata
  return blogPosts.map((p, idx) => ({
    id: `static-${idx}`,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    content: Array.isArray(p.content) ? p.content.join("\n\n") : p.content,
    category: p.category,
    read_time: p.readTime,
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  }));
}

/**
 * Ottiene un post specifico per ID (per modifica in admin)
 */
export async function getPostByIdAdmin(id: string): Promise<DBPost | null> {
  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (!error && data) {
      return data;
    }
  } catch (err) {
    console.warn("Supabase post by id error:", err);
  }

  return null;
}
