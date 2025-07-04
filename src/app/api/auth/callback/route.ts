import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Create redirect to frontend callback page
  const redirectUrl = new URL("/auth/callback", request.url);
  const response = NextResponse.redirect(redirectUrl);

  // Get Set-Cookie headers from request
  const requestCookies = request.headers.get("set-cookie");
  console.log(
    "🚀 ~ file: route.ts:9 ~ Incoming Set-Cookie header:",
    requestCookies
  );

  // Get raw headers to see all headers
  const rawHeaders = Array.from(request.headers.entries());
  console.log("🚀 ~ file: route.ts:13 ~ All request headers:", rawHeaders);

  if (requestCookies) {
    // Split multiple Set-Cookie headers and ensure secure attributes are preserved
    const cookies = requestCookies
      .split(",")
      .map((cookie) => cookie.trim())
      .filter((cookie) => cookie); // Remove empty strings

    cookies.forEach((cookie) => {
      // Ensure secure attributes are present for production
      if (!cookie.includes("SameSite=None")) {
        cookie = `${cookie}; SameSite=None; Secure`;
      } else if (!cookie.includes("Secure")) {
        cookie = `${cookie}; Secure`;
      }
      response.headers.append("Set-Cookie", cookie);
    });
  }

  // Log response headers for debugging
  console.log(
    "🚀 ~ file: route.ts:31 ~ Response headers:",
    Array.from(response.headers.entries())
  );

  return response;
}
