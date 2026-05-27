import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

export const LOCALE_COOKIE = "NEXT_LOCALE";

const PUBLIC_FILE = /\.(.*)$/;

function pickLocaleFromHeader(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const parsed = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q = "q=1"] = part.trim().split(";");
      const quality = Number(q.split("=")[1]) || 0;
      return { tag: tag.trim(), quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of parsed) {
    if (isLocale(tag)) return tag;
    const language = tag.split("-")[0].toLowerCase();
    const match = locales.find((l) => l.split("-")[0].toLowerCase() === language);
    if (match) return match;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && isLocale(first)) {
    return;
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : pickLocaleFromHeader(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|favicon.svg|favicon-96x96.png|apple-touch-icon.png|og-image.webp|placeholder.svg|robots.txt|sitemap.xml|site.webmanifest|web-app-manifest-192x192.png|web-app-manifest-512x512.png).*)",
  ],
};
