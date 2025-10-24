import { NextResponse, NextRequest } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function POST(request: Request) {
   try {
      const userObject = await request.json();
      const response = await fetch(`${bleepAPIURL}/register/`, {
         method: "POST",
         headers: { 
            "Content-Type": "application/json" 
         },
         credentials: "include",
         body: JSON.stringify(userObject),
      });

      if (!response.ok) {
         const errorData = await response.json();
         return NextResponse.json(
            { message: errorData.message },
            { status: response.status }
         );
      }

      const data = await response.json();
      return NextResponse.json(data);
   } catch (error: any) {
      console.error("Register API Error:", error);
      return NextResponse.json(
         { message: "Something went wrong during registration." },
         { status: 500 }
      );
   }
}