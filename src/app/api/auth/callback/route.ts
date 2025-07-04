import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Get tokens from URL parameters
    const searchParams = new URL(request.url).searchParams;
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    // Create redirect to frontend callback page
    const redirectUrl = new URL("/auth/callback", request.url);
    const response = NextResponse.redirect(redirectUrl);

    // Set tokens as secure cookies
    if (accessToken) {
      response.headers.append(
        "Set-Cookie",
        `accessToken=${accessToken}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${
          1 * 60 * 60 // 1 hour
        }`
      );
    }

    if (refreshToken) {
      response.headers.append(
        "Set-Cookie",
        `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=${
          2 * 24 * 60 * 60 // 2 days
        }`
      );
    }

    return response;
  } catch (error: any) {
    console.error("Auth callback error:", error);
    // Still redirect to callback page even on error, the frontend will handle the error state
    const redirectUrl = new URL("/auth/callback", request.url);
    return NextResponse.redirect(redirectUrl);
  }
}
