import { NextResponse, NextRequest } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function GET(req: NextRequest) {
   try {
      const cookieHeader = req.headers.get("cookie") || "";

      const response = await fetch(`${bleepAPIURL}/establishments`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         cache: "no-store",
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: `Failed to fetch establishments (${response.status})` },
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

export async function POST(req: NextRequest) {
   try {
      const cookieHeader = req.headers.get("cookie") || "";
      const body = await req.json();

      const response = await fetch(`${bleepAPIURL}/establishments`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         body: JSON.stringify(body),
         cache: "no-store",
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: `Failed to create establishment (${response.status})` },
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