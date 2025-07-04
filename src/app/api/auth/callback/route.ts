import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Create redirect to frontend callback page
  const redirectUrl = new URL("/auth/callback", request.url);
  const response = NextResponse.redirect(redirectUrl);

  // Copy all cookies from the incoming request to the redirect response
  // const reqcookies = request.headers.forEach((value, key) => {
  //   console.log("🚀 ~ file: route.ts:10 ~ reqcookies:", value, key);
  // });

  // const cookies = request.headers.get("cookie");
  // console.log("🚀 ~ file: route.ts:10 ~ cookies:", typeof cookies);
  // if (cookies) {
  //   response.headers.append("Set-Cookie", cookies);
  // }

  response.headers.set("Set-Cookie", request.headers.get("cookie") || "");

  return response;
}
