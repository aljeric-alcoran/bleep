import { NextResponse } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function GET(
   req: Request,
   { params }: { params: Promise<{ productId: string }> }
) {
   try {
      const { productId } = await params;
      const cookieHeader = req.headers.get("cookie") || "";
      const response = await fetch(`${bleepAPIURL}/products/${productId}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         cache: "no-store",
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: `Failed to get product: ${productId}` },
            { status: response.status }
         );
      }

      const data = await response.json();
      return NextResponse.json(data);
   } catch (error) {
      console.error("Error getting specific product:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}