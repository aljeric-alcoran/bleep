import { NextResponse, NextRequest } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function GET(req: NextRequest) {
   try {
      const cookieHeader = req.headers.get("cookie") || "";
      const response = await fetch(`${bleepAPIURL}/categories`, {
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

export async function POST(req: Request) {
   try {
      const categoryObject = await req.json();
      const cookieHeader = req.headers.get("cookie") || "";
      const response = await fetch(`${bleepAPIURL}/categories`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         cache: "no-store",
         body: JSON.stringify(categoryObject),
      });
   
      if (!response.ok) {
         return NextResponse.json(
            { error: "Failed to add category" },
            { status: response.status }
         );
      }
   
      const data = await response.json();
      return NextResponse.json(data);
   } catch (error) {
      console.error("Error adding category:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}