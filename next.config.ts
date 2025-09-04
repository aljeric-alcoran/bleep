import type { NextConfig } from "next";
const bleepUrLApi = "http://localhost:3000";

const nextConfig: NextConfig = {
   /* config options here */
   devIndicators: false,
   rewrites: async () => {
      return [
         {
            source: "/api/auth/logout",
            destination: `${bleepUrLApi}/api/auth/logout`,
         },
      ];
   }
};

export default nextConfig;
