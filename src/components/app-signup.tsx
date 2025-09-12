'use client';

import { useSignup } from "@/app/context/SignupContext";
import GoogleSignup from "@/components/google";
import SignupForm from "./forms/signup-form";
import Image from "next/image";
import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react";
import VerifyOTPForm from "./forms/verify-otp-form";
import { title } from "process";

export default function Signup() {
   const { email, step, setStep, setOtp } = useSignup();
   const cardDescriptions = [
      {
         title: "Welcome to Bleep",
         description: "Register a new account",
      },
      {
         title: "One-Time Password",
         description: "Please enter the one-time password sent to your email.",
      },
      {
         title: "Create your account",
         description: "Please fill out the following information to register.",
      }
   ]

   useEffect(() => {
      setStep(step);
   }, [email]);
   return (
      <div className="w-full flex justify-center items-center">
         <Card className="w-full shadow-none border-transparent p-0">
            <CardHeader className="p-0">
               <CardTitle className="text-lg font-semibold">{cardDescriptions[step - 1].title}</CardTitle>
               <CardDescription>{cardDescriptions[step - 1].description}</CardDescription>
               <CardAction>
                  <Image
                     src="/logo.png"
                     width={40}
                     height={40}
                     alt="Bleep logo"
                     priority
                  />
               </CardAction>
            </CardHeader>
            <CardContent className="p-0 pt-4">
               { step === 1 && <SignupForm /> }
               { step === 2 && <VerifyOTPForm setOtp={setOtp} email={email}/> }
            </CardContent>
            { step === 1 && (
               <CardFooter className="flex flex-col gap-4 p-0">
                  <p className="text-xs text-gray-400 dark:text-white">Or sign in using</p>
                  <GoogleSignup />
               </CardFooter>
            )}
         </Card>
      </div>
   );
}