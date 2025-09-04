'use client'

import VerifyOTPForm from "./Form";
import { useEffect } from "react";
import { useSignup } from "@/app/context/SignupContext";
import { useRouter } from "next/navigation";

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"


export default function VerifyOTP() {
   const router = useRouter();
   const { email, setOtp } = useSignup();

   useEffect(() => {
      if (!email) router.replace("/signup");
   }, [email, router]);

   return (
      <div className="flex justify-center items-center h-dvh">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle className="text-lg font-semibold">One-Time Password</CardTitle>
               <CardDescription>Please enter the one-time password sent to your email.</CardDescription>
            </CardHeader>
            <CardContent>
               <VerifyOTPForm setOtp={setOtp} email={email} />
            </CardContent>
         </Card>
      </div>
   );
}