import { NextResponse, NextRequest } from "next/server";
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function GET(req: NextRequest) {
   try {
      const cookieHeader = req.headers.get("cookie") || "";
      const response = await fetch(`${backendURL}/categories`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         cache: "no-store",
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: `Failed to fetch categories (${response.status})` },
            { status: response.status }
         );
      }

      const data = await response.json();
      return NextResponse.json(data);
   } catch (error: any) {
      return NextResponse.json(
         { error: error.message || "Internal Server Error" },
         { status: 500 }
      );
   }
}