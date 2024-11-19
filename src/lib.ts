import { cookies } from "next/headers";

async function verifyToken() {
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
      }
    );
    const data = await response.json();
    return data.data as TokenPayload;
  } catch (error) {
    return null;
  }
}

const getToken = async () => {
  const tokenData = await verifyToken();
  return tokenData;
};

export default getToken;
