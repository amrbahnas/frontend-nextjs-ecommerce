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
  const cookies = request.headers.get("cookie");
  const cookieArray = cookies?.split(";");
  console.log("🚀 ~ file: route.ts:20 ~ cookieArray:new", cookieArray);
  if (cookieArray) {
    cookieArray.forEach((cookie) => {
      response.headers.append("Set-Cookie", cookie);
    });
  }

  console.log("🚀 ~ file: route.ts:28 ~ response:", response.headers);
  return response;
}
