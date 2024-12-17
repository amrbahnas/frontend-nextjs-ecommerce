import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./lib";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ar"],
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: "en",
  // Whether to add locale prefix for default locale
  localePrefix: "never",
});

const protectedRoutes = [
  "/profile",
  "/wishlist",
  "/verifyEmail",
  "/orders",
  "/profile/change-Email",
];

export async function middleware(request: NextRequest) {
  // First, get the intl response
  const intlResponse = await intlMiddleware(request);
  const tokenData = await verifyToken();

  const pathName = request.nextUrl.pathname;

  // Helper function to create redirects that preserve intl headers
  const createRedirectResponse = (url: string) => {
    const response = NextResponse.redirect(new URL(url, request.url));
    // Copy headers from intlResponse to preserve internationalization
    intlResponse.headers.forEach((value, key) => {
      response.headers.set(key, value);
    });
    return response;
  };

  // 1) Handling Auth routes section
  if (pathName.startsWith("/auth")) {
    if (!tokenData) {
      return intlResponse;
    } else {
      return createRedirectResponse("/");
    }
  }

  // 2) Handling Admin routes section
  if (pathName.startsWith("/admin")) {
    if (!tokenData) {
      return createRedirectResponse("/auth/login");
    }
    if (tokenData?.role === "admin") {
      return intlResponse;
    } else {
      return createRedirectResponse("/notAllowed?page=admin");
    }
  }

  // 3) Handling email verification and InActive users
  if (tokenData) {
    if (!tokenData.active && pathName !== "/inactiveAccount") {
      return createRedirectResponse("/inactiveAccount");
    }
    if (tokenData.active && pathName === "/inactiveAccount") {
      return createRedirectResponse("/");
    }
    if (!tokenData.emailVerified && pathName !== "/verifyEmail") {
      return createRedirectResponse("/verifyEmail");
    }
    if (tokenData.emailVerified && pathName === "/verifyEmail") {
      return createRedirectResponse("/");
    }
  }

  // 4) Handling protected routes section
  if (protectedRoutes.includes(pathName)) {
    if (!tokenData) {
      return createRedirectResponse("/auth/login");
    }
  }

  // For all other cases, return the intl response
  return intlResponse;
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: [
    // Match all pathnames except those starting with:
    // - api (API routes)
    // - _next (Next.js internals)
    // - .*\\..*$ (files with an extension, e.g. favicon.ico)
    "/((?!api|_next|.*\\.[^/]*$).*)",
  ],
};
