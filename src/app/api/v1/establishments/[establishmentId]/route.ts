import { NextResponse } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function PUT(
   req: Request,
   { params }: { params: Promise<{ establishmentId: string }> }
) {
   try {
      const { establishmentId } = await params;
      const cookieHeader = req.headers.get("cookie") || "";
      const establishmentObject = await req.json();

      const response = await fetch(`${bleepAPIURL}/establishments/${establishmentId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         body: JSON.stringify(establishmentObject),
         cache: "no-store",
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: "Failed to update establishment" },
            { status: response.status }
         );
      }

      const data = await response.json();
      return NextResponse.json(data);
   } catch (error) {
      console.error("Error updating category:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}