"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { redirectUser } from "@/lib/api/auth";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner"
import { validateAccessToken } from "@/lib/helpers";
import { useUserStore } from "@/store/useUserStore";

export default function Callback() {
   const router = useRouter();

   useEffect(() => {
      const checkAuth = async () => {
         try {
            const response = await redirectUser();
            
            if (response.accessToken) {
               const { user } = await validateAccessToken(response.accessToken);
               useUserStore.getState().setUser(user, response.accessToken);
               router.replace("/");
            } else {
               router.replace("/?error=auth_failed");
               toast.error("Login failed!", {
                  description: "Authentication failed. Please try again."
               })
            }
         } catch (err) {
            router.replace("/?error=network_error");
            toast.error("Login failed!", { 
               description: "Network error. Please try again." 
            })
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
