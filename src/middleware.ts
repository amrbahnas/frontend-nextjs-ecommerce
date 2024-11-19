import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// A function to verify the token and return the token data
async function verifyToken(token: string | undefined) {
  if (!token) return null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }
    );
    const data = await response.json();
    return data.data as TokenPayload;
  } catch (error) {
    return null;
  }
}

const protectedRoutes = ["/profile", "/wishlist", "/verifyEmail"];

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  // const token = request.cookies.get("token")?.value;
  const token = request.cookies.get("authToken")?.value;
  console.log("🚀 ~ middleware ~ token:", token);
  const tokenData = await verifyToken(token);

  //1) Handling Auth routes section
  if (pathName.startsWith("/auth")) {
    if (!tokenData) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //2) Handling Admin routes section
  if (pathName.startsWith("/admin")) {
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

  //3) Handling  email verification
  if (tokenData) {
    if (!tokenData.emailVerified && pathName !== "/verifyEmail") {
      return NextResponse.redirect(new URL("/verifyEmail", request.url));
    }
    if (tokenData.emailVerified && pathName === "/verifyEmail") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  //4) Handling protected routes section
  if (protectedRoutes.includes(pathName)) {
    if (tokenData) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // only run on route Pages and not on static pages
  matcher: ["/", "/((?!.*\\..*|_next).*)"],
};
