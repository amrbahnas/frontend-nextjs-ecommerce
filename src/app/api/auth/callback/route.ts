import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Create redirect to frontend callback page
  const redirectUrl = new URL("/auth/callback", request.url);
  const response = NextResponse.redirect(redirectUrl);

  // Get Set-Cookie headers
  const setCookieHeader = request.headers.get("set-cookie");
  console.log("🚀 ~ file: route.ts:9 ~ Set-Cookie header:", setCookieHeader);

  if (setCookieHeader) {
    // Split multiple Set-Cookie headers and forward each one
    const cookies = setCookieHeader.split(",").map((cookie) => cookie.trim());
    cookies.forEach((cookie) => {
      response.headers.append("Set-Cookie", cookie);
    });
  }

  // Also check regular cookie header
  const cookies = request.headers.get("cookie");
  console.log("🚀 ~ file: route.ts:19 ~ regular cookies:", cookies);

  return response;
}
