'use client'

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form"

const formSchema = z.object({
   email: z.email(),
   password: z.string().min(8).max(50),
})

export default function LoginForm() {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   })

   function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values)
   }

   return (
      <div className="flex justify-center items-center h-dvh">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle className="text-lg font-semibold">Welcome Back!</CardTitle>
               <CardDescription>Login to your existing bleep account</CardDescription>
            </CardHeader>
            <CardContent>
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
                                       <Input placeholder="e.g. john@email.com" {...field} />
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
                                       <Input type="password" placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage className="text-xs" />
                                 </FormItem>
                              )}
                           />
                        </div>
                     </div>
                     <Button type="submit" className="w-full">Submit</Button>
                  </form>
               </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
               <p className="text-xs text-gray-400 dark:text-white">Or sign in using</p>
               <Button type="submit" className="w-full bg-gray-200 text-gray-900 flex items-center justify-center hover:bg-gray-300">
                  <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                     <path fillRule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clipRule="evenodd"/>
                  </svg>
                  Google
               </Button> 
            </CardFooter>
         </Card>
      </div>
   );
}