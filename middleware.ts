import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const locales = ["en", "ru", "hy"];
export const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/images") ||
    pathname.includes(".") 
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/((?!_next).*)",
  ],
};
