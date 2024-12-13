import { cookies } from "next/headers";

import axiosInstance from "./config/apiClient";

export async function verifyToken() {
  const session = cookies().get("session")?.value;

  if (!session) {
    return null;
  }
  try {
    const response = await axiosInstance.post(`/auth/verify-token`, {
      session,
    });

    return response.data.data;
  } catch (error) {
    return null;
  }
}
