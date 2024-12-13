import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import proxyAxiosInstance from "@/config/proxyApiClient";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = "/" + params.path.join("/");
  return handleRequest(request, path, "GET");
}

export async function POST(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = "/" + params.path.join("/");
  return handleRequest(request, path, "POST");
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = "/" + params.path.join("/");
  console.log("🚀 ~ file: route.ts:28 ~ path:", path);
  return handleRequest(request, path, "PUT");
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = "/" + params.path.join("/");
  return handleRequest(request, path, "DELETE");
}

async function handleRequest(
  request: NextRequest,
  path: string,
  method: RequestMethod
) {
  try {
    const url = process.env.NEXT_PUBLIC_BASE_URL + path;
    let requestData: any;
    const contentType = request.headers.get("content-type");

    // Handle different content types
    if (contentType?.includes("multipart/form-data")) {
      requestData = await request.formData();
      console.log("🚀 ~ file: route.ts:53 ~ requestData:", requestData);
    } else if (contentType?.includes("application/json")) {
      requestData = await request.json().catch(() => ({}));
    }

    const config = {
      headers: {
        Cookie: request.headers.get("cookie") || "",
      },
    };

    let response;

    switch (method) {
      case "GET":
        response = await proxyAxiosInstance.get(url, config);
        break;
      case "POST":
        response = await proxyAxiosInstance.post(url, requestData, config);
        break;
      case "PUT":
        response = await proxyAxiosInstance.put(url, requestData, config);
        break;
      case "DELETE":
        response = await proxyAxiosInstance.delete(url, config);
        break;
      default:
        throw new Error(`Unsupported method: ${method}`);
    }

    const newResponse = NextResponse.json(response.data);

    // Handle cookies
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
        error.response?.data || "Failed to process request",
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json("Internal server error", { status: 500 });
  }
}
