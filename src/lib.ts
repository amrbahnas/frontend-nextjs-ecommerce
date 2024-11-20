"use server";
import { cookies } from "next/headers";

async function getToken() {
  const token = cookies().get("authToken")?.value;
  console.log("🚀 ~ verifyToken ~ token:", token);
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
        credentials: "include",
      }
    );
    const data = await response.json();
    return data.data as TokenPayload;
  } catch (error) {
    return null;
  }
}

export default getToken;
