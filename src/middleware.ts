import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
async function getToken() {
  // const token = (await cookies()).get("session");
  // return token;
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-token`,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    // const data = await response.json();
    return response;
  } catch (error) {
    return error;
  }
}

const protectedRoutes = ["/profile", "/wishlist", "/verifyEmail"];

export async function middleware(request: NextRequest) {
  const session = await cookies().get("session");
  console.log("🚀 ~ middleware ~ session:", session);
  // const tokenData = await getToken();
  // console.log("🚀 ~ middleware ~ tokenData:", tokenData);
  // const pathName = request.nextUrl.pathname;
  //1) Handling Auth routes section
  // if (pathName.startsWith("/auth")) {
  //   if (!tokenData) {
  //     return NextResponse.next();
  //   } else {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  // //2) Handling Admin routes section
  // if (pathName.startsWith("/admin")) {
  //   if (!tokenData) {
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }
  //   if (tokenData?.isAdmin) {
  //     return NextResponse.next();
  //   } else {
  //     return NextResponse.redirect(
  //       new URL("/notAllowed?page=admin", request.url)
  //     );
  //   }
  // }

  // //3) Handling  email verification
  // if (tokenData) {
  //   if (!tokenData.emailVerified && pathName !== "/verifyEmail") {
  //     return NextResponse.redirect(new URL("/verifyEmail", request.url));
  //   }
  //   if (tokenData.emailVerified && pathName === "/verifyEmail") {
  //     return NextResponse.redirect(new URL("/", request.url));
  //   }
  // }

  // //4) Handling protected routes section
  // if (protectedRoutes.includes(pathName)) {
  //   if (tokenData) {
  //     return NextResponse.next();
  //   } else {
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  // only run on route Pages and not on static pages
  // matcher: ["/", "/((?!.*\\..*|_next).*)"],
  // routes middleware should not run on
  matcher: ["/((?!api|_next/static|_next/images).*)"],
};
