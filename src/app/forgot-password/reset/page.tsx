'use client'

import { useEffect, useState } from "react";
import ResetPasswordForm from "./Form";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { validateResetToken } from "@/lib/helpers";
import { useSearchParams } from "next/navigation";
import { Unlink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function ForgotPassword() {
   const [tokenExpired, setTokenExpired] = useState<boolean>(false);
   const searchParams = useSearchParams();
   const token = searchParams.get("token") || "";

   async function verifyToken() {
      const isValid = await validateResetToken(token);
      if (!isValid) {
         setTokenExpired(true);
      }
   }

   useEffect(() => {
      verifyToken();
   }, []);
   
   return (
      <>
         <div className="flex justify-center items-center h-dvh">
         {!tokenExpired ? (
            <Card className="w-full max-w-sm">
               <CardHeader>
                  <CardTitle className="text-lg font-semibold">Reset Password</CardTitle>
                  <CardDescription>Enter your new password.</CardDescription>
               </CardHeader>
               <CardContent>
                  <ResetPasswordForm token={token} />
               </CardContent>
            </Card>
         ): 
            <Card className="w-full max-w-sm">
               <CardContent className="flex flex-col gap-2 items-center">
                  <Unlink className="w-6 h-6 mb-4"/>
                  <p className="font-semibold">Looks like that link expired</p>
                  <p className="text-sm text-gray-500 text-center">Login link expires for 15 minutes and can only be used once. You can request a new one by clicking the button below.</p>
                  <Link href="/forgot-password" className="w-full mt-5">
                     <Button className="w-full">Request New Link</Button>
                  </Link>
               </CardContent>
            </Card>
         }
         </div>
      </>
   );
}