import { NextResponse } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: Request) {
   try {
      const cookieHeader = req.headers.get("cookie") || "";

      const response = await fetch(`${bleepAPIURL}/auth/me`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: "Failed to redirect user!" },
            { status: response.status }
         );
      }

      const data = await response.json();
      return NextResponse.json(data);
   } catch (error) {
      console.error("Error fetching user info:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}