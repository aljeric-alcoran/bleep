import { NextResponse } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: Request) {
   try {
      const { email, password, remember } = await req.json();

      const backendResponse = await fetch(`${bleepAPIURL}/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         credentials: 'include',
         body: JSON.stringify({ email, password, remember }),
      });

      if (!backendResponse.ok) {
         return NextResponse.json(
            { error: "Login failed" },
            { status: backendResponse.status }
         );
      }

      const setCookieHeader = backendResponse.headers.get("set-cookie");
      const data = await backendResponse.json();

      const response = NextResponse.json(data);
      if (setCookieHeader) response.headers.set("set-cookie", setCookieHeader);

      return response;
   } catch (error) {
      console.error("Error logging in:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}