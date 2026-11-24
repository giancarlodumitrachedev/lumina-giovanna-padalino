import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  SESSION_COOKIE_NAME,
  verifySignedAdminToken,
} from "@/lib/admin-auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const rawToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySignedAdminToken(rawToken);

  // Se l'utente è già autenticato e visita /admin/login, reindirizza subito a /admin
  if (pathname === "/admin/login") {
    if (session) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store, private, must-revalidate");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  // Protezione API riservate (/api/admin/*)
  if (pathname.startsWith("/api/admin")) {
    if (!session) {
      return NextResponse.json(
        { error: "Accesso non autorizzato." },
        {
          status: 401,
          headers: { "Cache-Control": "no-store, private" },
        }
      );
    }
    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store, private, must-revalidate");
    return res;
  }

  // Protezione pagine riservate (/admin/*)
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const redirectRes = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );
      if (rawToken) {
        redirectRes.cookies.delete(SESSION_COOKIE_NAME);
      }
      redirectRes.headers.set("Cache-Control", "no-store, private");
      return redirectRes;
    }

    const res = NextResponse.next();
    res.headers.set("Cache-Control", "no-store, private, must-revalidate");
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
