'use client'

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form"
import { Input } from "@/components/ui/input";

const formSchema = z.object({
   email: z.email(),
})

export default function ForgotPasswordForm() {
   const router = useRouter();
   
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
      },
   })

   function onSubmit(values: z.infer<typeof formSchema>) {
      router.push("/signup/create-account");
      console.log(values)
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col gap-4">
               <div className="text-gray-900 dark:text-white pt-6 w-full">
                  <FormField
                     control={form.control}
                     name="email"
                     render={({ field }) => (
                        <FormItem>
                           <FormControl>
                              <FormItem>
                                 <FormLabel>Email</FormLabel>
                                 <FormControl>
                                    <Input placeholder="e.g. john@email.com" {...field} />
                                 </FormControl>
                                 <FormMessage className="text-xs"/>
                              </FormItem>
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />
               </div>
            </div>
            <Button type="submit" className="w-full">Submit</Button>
         </form>
      </Form>
   );
}