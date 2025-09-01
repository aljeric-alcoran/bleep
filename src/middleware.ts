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
         const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
         await jwtVerify(accessToken, secret);
         isAccessTokenValid = true;
      } catch (err) {
         console.log("Access Token Verification Error:", err);
      }
   }

   if (isAccessTokenValid) {
      if (pathname.startsWith("/login")) {
         return NextResponse.redirect(new URL("/dashboard", req.url));
      }
   } else {
      if (refreshToken) {
         try {
            const { accessToken } = await requestAccessToken(refreshToken, req);

            if (accessToken) {
               const responseWithNewToken = NextResponse.next();
               responseWithNewToken.cookies.set("accessToken", accessToken, { httpOnly: true, secure: process.env.NODE_ENV !== "development", sameSite: "strict" });
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