import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { requestAccessToken } from "@/lib/api/auth";

export async function proxy(req: NextRequest) {
   const baseUrl = req.nextUrl.origin;
   const accessToken = req.cookies.get("accessToken")?.value;
   const refreshToken = req.cookies.get("refreshToken")?.value;

   let isAccessTokenValid = false;

   if (accessToken) {
      try {
         const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);
         await jwtVerify(accessToken, secret);
         isAccessTokenValid = true;
      } catch (error) {
         console.log("Access Token Verification Error:", error);
      }
   }

   if (isAccessTokenValid) {
      return NextResponse.next();
   }

   if (refreshToken) {
      try {
         const { accessToken: newAccessToken } = await requestAccessToken(baseUrl, refreshToken);
         if (newAccessToken) {
            const response = NextResponse.next();
            response.cookies.set("accessToken", newAccessToken, {
               httpOnly: true,
               secure: process.env.NODE_ENV !== "development",
               sameSite: "strict",
            });
            return response;
         }
      } catch (err) {
         console.error("Token refresh failed:", err);
      }
   }

   return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
   matcher: [
      "/dashboard",
      "/dashboard/:path*",
      "/categories",
      "/categories/:path*",
      "/my-account",
      "/my-account/:path*",
      "/establishments",
      "/establishments/:path*",
      "/products",
      "/products/:path*",
      "/my-orders",
      "/my-orders/:path*",
      "/settings",
      "/settings/:path*",
      "/cart",
      "/cart/:path*",

      "/api/v1/cart",
   ],
};