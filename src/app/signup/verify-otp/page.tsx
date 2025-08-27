'use client'

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Form,
   FormField,
 } from "@/components/ui/form"
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from "@/components/ui/input-otp"

const formSchema = z.object({
   otp: z.string()
   .min(6, "OTP must be 6 digits")
   .regex(/^[0-9]+$/, "OTP must contain only numbers"),
})


export default function SignupForm() {
   const [value, setValue] = React.useState("");
   
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         otp: "",
      },
   })

   function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
   }

   return (
      <div className="flex justify-center items-center h-dvh">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle className="text-lg font-semibold">One Time Password</CardTitle>
               <CardDescription>Copy code sent to your email</CardDescription>
               <CardAction>
                  <Link href="/">
                     <Button className="">
                        <svg className="w-6 h-6 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd"/>
                        </svg>
                     </Button>
                  </Link>
               </CardAction>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <div className="flex flex-col gap-4">
                        <div className="text-gray-900 dark:text-white">
                           <FormField
                              control={form.control}
                              name="otp"
                              render={({ field }) => (
                                 <InputOTP 
                                    className="w-full"
                                    maxLength={6}
                                    value={value}
                                    onChange={(val) => setValue(val.replace(/[^0-9]/g, ""))}
                                 >
                                    <InputOTPGroup className="flex justify-center w-full">
                                       {[...Array(6)].map((_, i) => (
                                          <InputOTPSlot key={i} index={i} className="w-12 h-12 text-center"/>
                                       ))}
                                    </InputOTPGroup>
                                 </InputOTP>
                              )}
                           />
                        </div>
                     </div>
                     <Button type="submit" className="w-full">Verify OTP</Button>
                  </form>
               </Form>
            </CardContent>
         </Card>
      </div>
   );
}