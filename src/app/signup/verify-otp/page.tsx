'use client'
import { useEffect, useState } from "react";
import { useSignup } from "@/app/context/SignupContext";

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormMessage,
 } from "@/components/ui/form"
import {
   InputOTP,
   InputOTPGroup,
   InputOTPSlot,
} from "@/components/ui/input-otp"
import { useRouter } from "next/navigation";

const formSchema = z.object({
   otp: z.string()
   .length(6, "OTP must be 6 digits"),
})


export default function VerifyOTP() {
   const router = useRouter();
   const { email, setOtp } = useSignup();

   useEffect(() => {
      if (!email) router.replace("/signup");
   }, [email, router]);
  
   if (!email) return null;
   
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         otp: "",
      },
   })

   function onSubmit(values: z.infer<typeof formSchema>) {
      setOtp(values.otp);
      router.push("/signup/create-account");
      console.log(values)
   }

   return (
      <div className="flex justify-center items-center h-dvh">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle className="text-lg font-semibold">One-Time Password</CardTitle>
               <CardDescription>Please enter the one-time password sent to your email.</CardDescription>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                     <div className="flex flex-col gap-4">
                        <div className="text-gray-900 dark:text-white pt-6 w-full">
                           <FormField
                              control={form.control}
                              name="otp"
                              render={({ field }) => (
                                 <FormItem>
                                    <FormControl>
                                       <InputOTP 
                                          className="w-full"
                                          maxLength={6}
                                          value={field.value}
                                          onChange={(val) => field.onChange(val)}
                                       >
                                          <InputOTPGroup className="flex justify-center w-full">
                                             {[...Array(6)].map((_, i) => (
                                                <InputOTPSlot key={i} index={i} className="w-full h-14 text-center text-lg font-semibold"/>
                                             ))}
                                          </InputOTPGroup>
                                       </InputOTP>
                                    </FormControl>
                                    <FormMessage className="text-xs"/>
                                 </FormItem>
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