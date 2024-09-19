import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  //1) Handling Auth routes section
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (!token) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //2) Handling protected routes section
  if (token) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  // 3) Add the protected routes to the matcher
  matcher: ["/auth/:path*", "/profile"],
};
