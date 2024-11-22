import "server-only";
import { cookies } from "next/headers";

async function getToken() {
  const token = (await cookies()).get("session");
  return token;
  // try {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-token`,
  //     {
  //       credentials: "include",
  //     }
  //   );
  //   const data = await response.json();
  //   return data.data as TokenPayload;
  // } catch (error) {
  //   return null;
  // }
}

export default getToken;
