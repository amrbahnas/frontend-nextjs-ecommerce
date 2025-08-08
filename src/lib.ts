import { cookies } from "next/headers";

import axiosInstance from "./config/apiClient";

export async function verifyToken() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (!refreshToken) {
    return null;
  }
  try {
    const response = await axiosInstance.post(`/auth/verify-token`, {
      refreshToken,
    });

    return response?.data?.data as User;
  } catch (error: any) {
    // case internal server error
    if (error?.response?.status !== 401) {
      return "error";
    }
    // case token is expired
    return null;
  }
}
