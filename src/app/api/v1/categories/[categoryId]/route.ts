import { NextResponse } from "next/server";
const bleepAPIURL = process.env.NEXT_PUBLIC_BACKEND_URL

export async function PUT(
   req: Request,
   { params }: { params: { categoryId: string } }
) {
   try {
      const { categoryId } = params;
      const categoryObject = await req.json();
      const cookieHeader = req.headers.get("cookie") || "";
      const response = await fetch(`${bleepAPIURL}/categories/${categoryId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         cache: "no-store",
         body: JSON.stringify(categoryObject),
      });

      if (!response.ok) {
         return NextResponse.json(
            { error: "Failed to update category" },
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

export async function DELETE(
   req: Request,
   { params }: { params: { categoryId: string } }
) {
   try {
      const { categoryId } = params;
      const cookieHeader = req.headers.get("cookie") || "";
      const response = await fetch(`${bleepAPIURL}/categories/${categoryId}`, {
         method: "DELETE",
         headers: {
            "Content-Type": "application/json",
            cookie: cookieHeader,
         },
         cache: "no-store",
      });
   
      if (!response.ok) {
         return NextResponse.json(
            { error: "Failed to delete category" },
            { status: response.status }
         );
      }
   
      const data = await response.json();
      return NextResponse.json(data);
   } catch (error) {
      console.error("Error deleting category:", error);
      return NextResponse.json(
         { error: "Internal server error" },
         { status: 500 }
      );
   }
}