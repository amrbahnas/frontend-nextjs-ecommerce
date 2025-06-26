import { cookies } from "next/headers";

import axiosInstance from "./config/apiClient";

export async function verifyToken() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) {
    return null;
  }
  try {
    const response = await axiosInstance.post(`/auth/verify-token`, {
      session,
    });

    return response?.data?.data as User;
  } catch (error) {
    return "error";
  }
}
