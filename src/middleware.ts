import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
   const token = req.cookies.get("accessToken")?.value;
   const { pathname } = req.nextUrl;
   
   let isTokenValid = false;

   if (token) {
      try {
         const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
         await jwtVerify(token, secret);
         isTokenValid = true;
      } catch (err) {
         console.log("JWT Verification Error:", err);
      }
   }

   if (isTokenValid) {
      if (pathname.startsWith("/login")) {
         return NextResponse.redirect(new URL("/dashboard", req.url));
      }
   } else {
      if (pathname.startsWith("/dashboard")) {
         return NextResponse.redirect(new URL("/login", req.url));
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/login", "/dashboard", "/dashboard/:path*"],
};

