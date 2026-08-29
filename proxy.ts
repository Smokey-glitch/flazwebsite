import { NextRequest, NextResponse } from "next/server";
import { verifySession, STUDIO_SESSION_COOKIE } from "@/lib/studio-auth";

const CMS_HOST = "cms.flaztechnicalservices.com";

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

export function proxy(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const { pathname, search } = request.nextUrl;
  const isCmsHost = host === CMS_HOST;
  const isLocalHost = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  const touchesStudio = pathname.startsWith("/studio") || pathname.startsWith("/api/studio");

  // Canonicalize: in production, /studio and /api/studio only ever live on the cms
  // subdomain, so there's exactly one host and one session cookie — no www-vs-bare-domain
  // mismatch to debug later. Localhost is exempt so `/studio` works directly in dev
  // without any DNS/hosts-file setup.
  if (touchesStudio && !isCmsHost && !isLocalHost) {
    return NextResponse.redirect(new URL(`https://${CMS_HOST}${pathname}${search}`));
  }

  // On the cms host, give page routes a clean URL while the actual files live under app/studio/*.
  let effectivePathname = pathname;
  let response: NextResponse | null = null;
  if (isCmsHost && !pathname.startsWith("/studio") && !pathname.startsWith("/api")) {
    effectivePathname = `/studio${pathname === "/" ? "" : pathname}`;
    response = NextResponse.rewrite(new URL(`${effectivePathname}${search}`, request.url));
  }

  const isLoginPath = effectivePathname === "/studio/login" || effectivePathname === "/api/studio/login";
  const needsAuth =
    (effectivePathname.startsWith("/studio") || effectivePathname.startsWith("/api/studio")) &&
    !isLoginPath;

  if (needsAuth) {
    const session = request.cookies.get(STUDIO_SESSION_COOKIE)?.value;
    if (!verifySession(session)) {
      if (effectivePathname.startsWith("/api/studio")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const loginUrl = isCmsHost
        ? new URL("/login", `https://${CMS_HOST}`)
        : new URL("/studio/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return response ?? NextResponse.next();
}
