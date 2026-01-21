'use client';

import GoogleSignup from "@/components/google";
import VerifyOTPForm from "./forms/verify-otp-form";
import SignupForm from "./forms/signup-form";
import Image from "next/image";
import { useSignup } from "@/app/context/SignupContext";
import { useEffect } from "react";
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import RegistrationForm from "./forms/create-account-form";

export default function Signup({ onSuccess }: { onSuccess: () => void }) {
   const { email, otp, step, setStep, setOtp } = useSignup();
   const cardDescriptions = [
      {
         title: "Welcome to Bleep",
         description: "Register a new account",
      },
      {
         title: "Enter verification code",
         description: "We sent a 6-digit code to your email.",
      },
      {
         title: "Create your account",
         description: "Please fill out the following information to register.",
      }
   ]
   const cardDescription = cardDescriptions[step - 1];

   useEffect(() => {
      setStep(step);
   }, [email]);
   return (
      <div className="w-full flex justify-center items-center">
         <Card className="w-full shadow-none border-transparent p-0">
            <CardHeader className="p-0">
               <CardTitle className="text-lg font-semibold text-center">
                  <Image
                     className="mx-auto mb-2"
                     src="/logo.png"
                     width={40}
                     height={40}
                     alt="Bleep logo"
                     priority
                  />
                  {cardDescription.title}
               </CardTitle>
               <CardDescription className="text-center">{cardDescription.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-0 pt-4">
               { step === 1 && <SignupForm /> }
               { step === 2 && <VerifyOTPForm /> }
               { step === 3 && <RegistrationForm onSuccess={onSuccess}/> }
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