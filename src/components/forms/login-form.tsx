'use client'

import Link from "next/link";
import { useState } from "react";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { loginUser } from "@/lib/api/auth";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleX, Loader } from "lucide-react";
import { validateAccessToken } from "@/lib/helpers";
import { useUserStore } from "@/store/useUserStore";

const formSchema = z.object({
   email: z.email(),
   password: z.string().min(8, "Password must be at least 8 characters").max(14),
   remember: z.boolean().optional(),
})

export default function LoginForm({ onSuccess }: { onSuccess: () => void }) {
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
         remember: false,
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true);
      const data = await loginUser(values);
      if (data.error) setError(data.error);
      else {
         setLoading(false);
         const { user } = await validateAccessToken(data.accessToken);
         useUserStore.getState().setUser(user, data.accessToken);
         onSuccess();
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
                  <FormField
                     control={form.control}
                     name="remember"
                     render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                           <FormControl>
                              <Checkbox checked={field.value} onCheckedChange={field.onChange} id="remember" />
                           </FormControl>
                           <FormLabel className="text-xs text-gray-500 dark:text-white">Remember me</FormLabel>
                           <FormMessage className="text-xs" />
                        </FormItem>
                     )}
                  />
                  <Link href="/forgot-password" className="text-xs text-gray-500 dark:text-white">Forgot Password</Link>
               </div>
               <Button type="submit" className="w-full hover:bg-red-700 cursor-pointer">
                  Login
                  {loading && <Loader className="animate-spin"/>}
               </Button>
            </form>
         </Form>
      </>
   );
}