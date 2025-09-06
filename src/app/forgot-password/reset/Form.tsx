import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleX, Link } from "lucide-react";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { resetPassword } from "@/lib/api/users";

export const PasswordSchema = z
   .object({
      password: z
         .string()
         .min(8, "Password must be at least 8 characters"),
         
      confirmPassword: z.string(),
   })
   .superRefine(({ password, confirmPassword }, ctx) => {
      if (password.trim() !== confirmPassword.trim()) {
         ctx.addIssue({
            code: "custom",
            path: ["confirmPassword"],
            message: "Passwords do not match",
         });
      }
   });

export default function ResetPasswordForm({token}: {token: string}) {
   const router = useRouter();
   const [message, setMessage] = useState<string | null>(null);
   const [success, setSuccess] = useState<boolean>(false);

   const form = useForm<z.infer<typeof PasswordSchema>>({
      resolver: zodResolver(PasswordSchema),
      defaultValues: {
         password: "",
         confirmPassword: "",
      }
   })

   async function onSubmit(values: z.infer<typeof PasswordSchema>) {
      const response = await resetPassword(token, values.confirmPassword);
      if (response.status === 200) {
         setMessage(response.message);
         setSuccess(true);
         setTimeout(() => {
            router.push("/login");
         }, 2000)
      } else {
         setMessage(response.message);
      }
   }

   return (
      <>
         {message ? (
            <Alert className="mb-6 bg-green-50 text-green-700">
               <CircleX />
               <AlertTitle className="text-xs mt-0.5 -ml-1">{message}</AlertTitle>
            </Alert>
         ) : null}
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <div className="flex flex-col gap-4">
                  <div className="text-gray-900 dark:text-white">
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Enter password</FormLabel>
                              <FormControl>
                                 <Input type="password" placeholder="" {...field} onKeyUp={(e) => setMessage(null)} />
                              </FormControl>
                              <FormMessage className="text-xs"/>
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="text-gray-900 dark:text-white">
                     <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                 <Input type="password" placeholder="" {...field} onKeyUp={(e) => setMessage(null)} />
                              </FormControl>
                              <FormMessage className="text-xs" />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
               <Button type="submit" disabled={success} className="w-full">Reset Password</Button>
            </form>
         </Form>
      </>
   );
}