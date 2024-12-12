import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios, { AxiosRequestConfig } from "axios";

// Extend AxiosRequestConfig to include retry properties
interface RetryConfig extends AxiosRequestConfig {
  retry?: number;
  retryDelay?: number;
}

// Create axios instance with retry logic
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
  timeout: 10000, // 10 second timeout
});

export async function POST() {
  try {
    const response = await axiosInstance.get("/auth/google");

    const newResponse = NextResponse.json(response.data);

    // Forward cookies from backend response
    const cookies = response.headers["set-cookie"];
    if (cookies) {
      cookies.forEach((cookie) => {
        newResponse.headers.append("Set-Cookie", cookie);
      });
    }

    return newResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // If backend is not available
      if (
        error.code === "ECONNREFUSED" ||
        error.code === "ECONNRESET" ||
        error.code === "ETIMEDOUT"
      ) {
        return NextResponse.json(
          { error: "Backend service is temporarily unavailable" },
          { status: 503 }
        );
      }
      // Return the error from the backend if available
      return NextResponse.json(
        { error: error.response?.data || "Failed to process request" },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
  return NextResponse.json({});
}
