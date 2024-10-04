import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// A function to verify the token and return the token data
async function verifyToken(token: string | undefined) {
  if (!token) return null;
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/auth/verify-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );
    const data = await response.json();
    return data.data;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const tokenData = await verifyToken(token);
  console.log("🚀 ~ middleware ~ tokenData:", tokenData);

  //1) Handling Auth routes section
  if (request.nextUrl.pathname.startsWith("/auth")) {
    if (!tokenData) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //2) Handling Admin routes section
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (!tokenData) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    if (tokenData?.isAdmin) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL("/notAllowed?page=admin", request.url)
      );
    }
  }

  //3) Handling protected routes section
  if (tokenData) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  // 3) Add the protected routes to the matcher
  matcher: ["/auth/:path*", "/admin/:path*", "/profile", "/wishlist"],
};
