"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirectUser } from "@/lib/api/auth";

export default function Callback() {
   const router = useRouter();

   useEffect(() => {
      const checkAuth = async () => {
         try {
            const response = await redirectUser();
            if (response.accessToken) {
               setTimeout(() => {
                  router.replace("/dashboard");
               }, 1000)
            } else {
               router.replace("/login?error=auth_failed");
            }
         } catch (err) {
            router.replace("/login?error=network_error");
         }
      };

      checkAuth();
   }, [router]);

   return <p>Checking login...</p>;
}
