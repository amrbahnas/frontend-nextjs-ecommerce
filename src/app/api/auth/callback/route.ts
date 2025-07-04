import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Create redirect to frontend callback page
  const redirectUrl = new URL("/auth/callback", request.url);
  const response = NextResponse.redirect(redirectUrl);

  // Copy all cookies from the incoming request to the redirect response
  const cookies = request.headers.get("cookie");
  if (cookies) {
    response.headers.set("Set-Cookie", cookies);
  }

  return response;
}
