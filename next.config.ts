import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   devIndicators: false,
   async rewrites() {
      return [
         {
            source: "/api/:path*",
            destination: "http://localhost:3000/api/:path*",
         },
      ];
   },
};

export default nextConfig;
