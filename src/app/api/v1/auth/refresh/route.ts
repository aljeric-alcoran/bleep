import { NextResponse } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function GET(req: Request) {
   try {
      const authHeader = req.headers.get("authorization");
      const refreshToken = authHeader?.split(" ")[1];

      if (!refreshToken) {
         return NextResponse.json({ error: "Missing refresh token" }, { status: 401 });
      }

      const response = await fetch(`${bleepAPIURL}/auth/refresh`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${refreshToken}`,
         },
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: "Failed to refresh token" },
            { status: response.status }
         );
      }

      const data = await response.json();
      return NextResponse.json(data);
   } catch (error) {
      console.error("Error refreshing token:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}