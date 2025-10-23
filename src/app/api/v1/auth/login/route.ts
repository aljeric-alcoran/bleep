import { NextResponse } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function POST(req: Request) {
   try {
      const { email, password, remember } = await req.json();

      const response = await fetch(`${bleepAPIURL}/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, password, remember }),
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: "Login failed" },
            { status: response.status }
         );
      }

      const data = await response.json();
      return NextResponse.json(data);
   } catch (error) {
      console.error("Error logging in:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}