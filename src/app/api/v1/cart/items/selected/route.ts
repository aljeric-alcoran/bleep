import { NextResponse, NextRequest } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function PATCH(req: Request) {
   try {
      const cookieHeader = req.headers.get("cookie") || "";

      const itemsPayload = await req.json();

      const response = await fetch(`${bleepAPIURL}/cart/items/selected`, {
         method: "PATCH",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         body: JSON.stringify(itemsPayload),
         cache: "no-store",
      });
   
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