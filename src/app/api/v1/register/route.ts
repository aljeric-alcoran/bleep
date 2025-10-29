import { NextResponse } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function POST(request: Request) {
   try {
      const userObject = await request.json();
      const backendResponse = await fetch(`${bleepAPIURL}/register/`, {
         method: "POST",
         headers: { 
            "Content-Type": "application/json" 
         },
         credentials: "include",
         body: JSON.stringify(userObject),
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
   } catch (error: any) {
      console.error("Register API Error:", error);
      return NextResponse.json(
         { message: "Something went wrong during registration." },
         { status: 500 }
      );
   }
}