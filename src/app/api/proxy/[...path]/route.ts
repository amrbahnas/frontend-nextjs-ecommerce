import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import axiosInstance from "@/config/apiClient";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const path = "/" + params.path.join("/");
  return handleRequest(request, path, "PATCH");
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
    let requestData: any;
    const contentType = request.headers.get("content-type");

    // Handle different content types
    if (contentType?.includes("multipart/form-data")) {
      requestData = await request.formData();
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
        response = await axiosInstance.get(path, config);
        break;
      case "POST":
        response = await axiosInstance.post(path, requestData, config);
        break;
      case "PUT":
        response = await axiosInstance.put(path, requestData, config);
        break;
      case "PATCH":
        response = await axiosInstance.patch(path, requestData, config);
        break;
      case "DELETE":
        response = await axiosInstance.delete(path, config);
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
