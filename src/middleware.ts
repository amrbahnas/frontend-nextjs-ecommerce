// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import createIntlMiddleware from 'next-intl/middleware';

// const protectedRoutes = ["/profile", "/wishlist", "/verifyEmail"];

// // Create the internationalization middleware
// const intlMiddleware = createIntlMiddleware({
//   locales: ['en', 'ar'],
//   defaultLocale: 'en',
//   localePrefix: 'never'
// });

// export async function middleware(request: NextRequest) {
//   // First, handle internationalization
//   const intlResponse = await intlMiddleware(request);
  
//   try {
//     // Skip auth check for public assets and API routes
//     if (
//       request.nextUrl.pathname.startsWith('/_next') ||
//       request.nextUrl.pathname.startsWith('/api') ||
//       request.nextUrl.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)
//     ) {
//       return intlResponse;
//     }

//     // Use the proxy endpoint to verify the token
//     const verifyResponse = await fetch(`${request.nextUrl.origin}/api/proxy/auth/verify-token`, {
//       credentials: 'include',
//       headers: {
//         Cookie: request.headers.get('cookie') || ''
//       }
//     });

//     // Handle backend connection issues gracefully
//     if (verifyResponse.status === 503) {
//       console.error('Backend service is not available');
//       // For non-protected routes, allow access
//       if (!protectedRoutes.includes(request.nextUrl.pathname) && 
//           !request.nextUrl.pathname.startsWith('/admin')) {
//         return intlResponse;
//       }
//       // For protected routes, redirect to an error page or show a message
//       const response = NextResponse.redirect(new URL('/service-unavailable', request.url));
//       intlResponse.headers.forEach((value, key) => {
//         response.headers.set(key, value);
//       });
//       return response;
//     }

//     if (!verifyResponse.ok) {
//       const pathName = request.nextUrl.pathname;
      
//       // 1) Handling Auth routes section
//       if (pathName.startsWith("/auth")) {
//         return intlResponse;
//       }

//       // 2) Handling Admin routes section
//       if (pathName.startsWith("/admin")) {
//         const response = NextResponse.redirect(new URL("/auth/login", request.url));
//         intlResponse.headers.forEach((value, key) => {
//           response.headers.set(key, value);
//         });
//         return response;
//       }

//       // 3) Handling protected routes section
//       if (protectedRoutes.includes(pathName)) {
//         const response = NextResponse.redirect(new URL("/auth/login", request.url));
//         intlResponse.headers.forEach((value, key) => {
//           response.headers.set(key, value);
//         });
//         return response;
//       }

//       return intlResponse;
//     }

//     const tokenData = await verifyResponse.json();
//     const pathName = request.nextUrl.pathname;

//     // 1) Handling Auth routes section
//     if (pathName.startsWith("/auth")) {
//       const response = NextResponse.redirect(new URL("/", request.url));
//       intlResponse.headers.forEach((value, key) => {
//         response.headers.set(key, value);
//       });
//       return response;
//     }

//     // 2) Handling Admin routes section
//     if (pathName.startsWith("/admin")) {
//       if (!tokenData.isAdmin) {
//         const response = NextResponse.redirect(new URL("/notAllowed?page=admin", request.url));
//         intlResponse.headers.forEach((value, key) => {
//           response.headers.set(key, value);
//         });
//         return response;
//       }
//     }

//     // 3) Handling email verification
//     if (!tokenData.emailVerified && pathName !== "/verifyEmail") {
//       const response = NextResponse.redirect(new URL("/verifyEmail", request.url));
//       intlResponse.headers.forEach((value, key) => {
//         response.headers.set(key, value);
//       });
//       return response;
//     }
//     if (tokenData.emailVerified && pathName === "/verifyEmail") {
//       const response = NextResponse.redirect(new URL("/", request.url));
//       intlResponse.headers.forEach((value, key) => {
//         response.headers.set(key, value);
//       });
//       return response;
//     }

//     // Create the final response based on intlResponse
//     const response = NextResponse.next();
    
//     // Copy headers from intlResponse
//     intlResponse.headers.forEach((value, key) => {
//       response.headers.set(key, value);
//     });

//     // Forward any new cookies from the verify response
//     verifyResponse.headers.forEach((value, key) => {
//       if (key.toLowerCase() === 'set-cookie') {
//         response.headers.append('Set-Cookie', value);
//       }
//     });

//     return response;
//   } catch (error) {
//     console.error('Middleware error:', error);
//     // On error, allow access to non-protected routes
//     if (!protectedRoutes.includes(request.nextUrl.pathname) && 
//         !request.nextUrl.pathname.startsWith('/admin')) {
//       return intlResponse;
//     }
//     // For protected routes, redirect to an error page
//     const response = NextResponse.redirect(new URL('/service-unavailable', request.url));
//     intlResponse.headers.forEach((value, key) => {
//       response.headers.set(key, value);
//     });
//     return response;
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/images).*)"],
// };

import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import {cookies} from 'next/headers';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'ar'],
  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',
  // Whether to add locale prefix for default locale
  localePrefix: 'never'
});



export async function middleware(request: NextRequest) {
  const session1 = request.cookies.get("session")?.value;
  const session2 = await cookies().get("session")?.value;

  console.log("🚀 ~ middleware ~ session1:", session1);
  console.log("🚀 ~ middleware ~ session2:", session2);

  // First, handle internationalization
  const intlResponse = await intlMiddleware(request);

  return intlResponse;

}

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};