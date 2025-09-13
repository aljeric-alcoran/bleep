"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirectUser } from "@/lib/api/auth";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Callback() {
   const router = useRouter();

   useEffect(() => {
      const checkAuth = async () => {
         try {
            const response = await redirectUser();
            
            if (response.accessToken) router.replace("/dashboard");
            else router.replace("/login?error=auth_failed");
         } catch (err) {
            router.replace("/login?error=network_error");
         }
      };
      checkAuth();
   }, [router]);

   return (
      <div className="flex justify-center items-center h-dvh">
         <Card className="w-full max-w-sm h-80 flex flex-col items-center justify-center">
            <CardContent className="flex flex-col items-center gap-4">
               <Image className="animate-bounce" src="/logo.png" width={40} height={40} alt="Bleep logo" />
               <p>Redirecting user...</p>
            </CardContent>
         </Card>
      </div>
   );
}
