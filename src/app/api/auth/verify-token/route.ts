import { NextResponse } from "next/server";

export async function GET(req: Request, context: any) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify-token`,
      {
        credentials: "include",
      }
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.error();
  }
}
