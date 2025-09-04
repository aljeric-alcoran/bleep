import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   devIndicators: false,
   rewrites: async () => {
      return [
         {
            source: "/api/auth/logout",
            destination: "http://localhost:3000/api/auth/logout",
         },
      ];
   }
};

export default nextConfig;
