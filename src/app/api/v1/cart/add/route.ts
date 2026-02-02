import { NextResponse, NextRequest } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: NextRequest) {
   try {
      const cookieHeader = req.headers.get("cookie") || "";
      const product = await req.json();

      const response = await fetch(`${bleepAPIURL}/cart/add`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         body: JSON.stringify(product),
         cache: "no-store",
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: `Failed to add item on cart. (${response.status})` },
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