import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from "axios";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  // Whether to add locale prefix for default locale
  localePrefix: 'never'
});

async function verifyToken() {
  const session = cookies().get("session")?.value;
  
  if (!session) {
    return null;
  }
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-token`,
      {
        session,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
     
    
    return response.data.data;
  } catch (error) {
    return null;
  }
}

const protectedRoutes = ["/profile", "/wishlist", "/verifyEmail","/orders"];

export async function middleware(request: NextRequest) {
  // First, get the intl response
  const intlResponse = await intlMiddleware(request);
  const tokenData = await verifyToken();
  const pathName = request.nextUrl.pathname;
  console.log("🚀 ~ file: middleware.ts:48 ~ tokenData:", tokenData)

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
    if (tokenData?.isAdmin) {
      return intlResponse;
    } else {
      return createRedirectResponse("/notAllowed?page=admin");
    }
  }

  // 3) Handling email verification
  if (tokenData) {
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
  matcher: ["/((?!api|_next/static|_next/images).*)"],
};