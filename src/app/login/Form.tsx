'use client'

import Link from "next/link";
import { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import loginUser from "@/lib/api/login";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleX } from "lucide-react";

const formSchema = z.object({
   email: z.email(),
   password: z.string().min(8, "Password must be at least 8 characters").max(14),
})

export default function LoginForm() {
   const [error, setError] = useState<string | null>(null);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      const data = await loginUser(values);
      if (data.error) setError(data.error);
      
      console.log(data);
   }

   return (
      <>
         {error ? (
            <Alert className="mb-6 bg-red-50 text-red-700">
               <CircleX />
               <AlertTitle>{error}</AlertTitle>
            </Alert>
         ) : null}
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <div className="flex flex-col gap-4">
                  <div className="text-gray-900 dark:text-white">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input placeholder="e.g. john@email.com" {...field} onKeyUp={(e) => setError(null)} />
                              </FormControl>
                              <FormMessage className="text-xs"/>
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="text-gray-900 dark:text-white">
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                 <Input type="password" placeholder="" {...field} onKeyUp={(e) => setError(null)} />
                              </FormControl>
                              <FormMessage className="text-xs" />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <Checkbox id="terms" />
                     <Label htmlFor="terms" className="text-xs">Remember me</Label>
                  </div>
                  <Link href="/forgot-password" className="text-xs text-gray-400 dark:text-white">Forgot Password</Link>
               </div>
               <Button type="submit" className="w-full">Submit</Button>
            </form>
         </Form>
      </>
   );
}