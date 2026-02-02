import { NextResponse, NextRequest } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function PUT(
   req: Request,
   { params }: { params: Promise<{ itemId: string }> }
) {
   try {
      const { itemId } = await params;
      const cookieHeader = req.headers.get("cookie") || "";

      const cartPayload = await req.json();

      const response = await fetch(`${bleepAPIURL}/cart/item/${itemId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         body: JSON.stringify(cartPayload),
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