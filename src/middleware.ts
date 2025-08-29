import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;

   if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
   }

   try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
      await jwtVerify(token, secret);

      return NextResponse.next();
   } catch (err) {
      console.log("JWT Verification Error:", err);
      return NextResponse.redirect(new URL("/login", req.url));
   }
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};

