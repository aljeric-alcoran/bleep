'use client'

import RegistrationForm from "@/app/signup/create-account/Form";
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

export default function Registration() {
   const router = useRouter();
   const { email, otp } = useSignup();

   useEffect(() => {
      if (!email || !otp) router.replace("/signup");
   }, [email, otp, router]);

   return (
      <div className="flex justify-center items-center h-dvh">
         <Card className="w-full max-w-lg">
            <CardHeader>
               <CardTitle className="text-lg font-semibold">Create your account</CardTitle>
               <CardDescription>Please fill out the following information to register.</CardDescription>
            </CardHeader>
            <CardContent>
               <RegistrationForm verifiedEmail={email} otp={otp} />
            </CardContent>
         </Card>
      </div>
   );
}