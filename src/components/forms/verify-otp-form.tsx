'use client'

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/lib/api/registration";
import { useState } from "react";

import { Button } from "@/components/ui/button"
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
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleX } from "lucide-react";

const formSchema = z.object({
   otp: z.string()
   .length(6, "OTP must be 6 digits"),
})

export default function VerifyOTPForm({ 
   setOtp, 
   email 
}: {
   setOtp: (otp: string) => void; 
   email: string | null
}) {
   const router = useRouter();
   const [error, setError] = useState<string | null>(null);
   
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         otp: "",
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      setOtp(values.otp);
      const response = await verifyEmail(email, values.otp);

      if (response.status === 200) {
         router.push("/signup/create-account");
      } else {
         setError(response.message);
      }
   }

   return (
      <>
      {error ? (
            <Alert className="mb-6 bg-red-50 text-red-700">
               <CircleX />
               <AlertTitle className="text-xs mt-0.5 -ml-1">{error}</AlertTitle>
            </Alert>
         ) : null}
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <div className="flex flex-col gap-4">
                  <div className="text-gray-900 dark:text-white pt-4 w-full">
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
                                    onChange={(val) => {
                                       field.onChange(val);
                                       setError(null);
                                    }}
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
      </>
   );
}