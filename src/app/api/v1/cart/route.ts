import { NextResponse, NextRequest } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function GET(req: NextRequest) {
   try {
      const cookieHeader = req.headers.get("cookie") || "";
      const response = await fetch(`${bleepAPIURL}/cart`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "cookie": cookieHeader,
         },
         cache: "no-store",
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: `Failed to fetch cart (${response.status})`},
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