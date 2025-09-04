import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { requestAccessToken } from "@/lib/api/auth";

export async function middleware(req: NextRequest) {
   const accessToken = req.cookies.get("accessToken")?.value;
   const refreshToken = req.cookies.get("refreshToken")?.value;
   const { pathname } = req.nextUrl;
   
   let isAccessTokenValid = false;

   if (accessToken) {
      try {
         const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);
         await jwtVerify(accessToken, secret);
         isAccessTokenValid = true;
      } catch (error: { code: string } | any) {
         console.log("Access Token Verification Error:", error);
      }
   }

   if (isAccessTokenValid) {
      if (pathname.startsWith("/login")) {
         return NextResponse.redirect(new URL("/dashboard", req.url));
      }
   } else {
      if (refreshToken) {
         try {
            const { accessToken: newAccessToken } = await requestAccessToken(refreshToken);
            console.log("Middleware: New Access Token:", newAccessToken);
            if (newAccessToken) {
               const responseWithNewToken = NextResponse.next();
               responseWithNewToken.cookies.set("accessToken", newAccessToken, { httpOnly: true, secure: process.env.NODE_ENV !== "development", sameSite: "strict" });
               NextResponse.redirect(new URL("/dashboard", req.url));
               return responseWithNewToken;
            } else {
               if (pathname.startsWith("/dashboard")) {
                  return NextResponse.redirect(new URL("/login", req.url));
               }
            }
         } catch (err) {
            console.error("Token refresh failed:", err);
            if (pathname.startsWith("/dashboard")) {
               return NextResponse.redirect(new URL("/login", req.url));
            }
         }
      } else {
         if (pathname.startsWith("/dashboard")) {
            return NextResponse.redirect(new URL("/login", req.url));
         }
      }
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/login", "/dashboard", "/dashboard/:path*"],
};