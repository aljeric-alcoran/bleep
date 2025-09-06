'use client'

import { set, z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordRequest } from "@/lib/api/users";
import { useState } from "react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { Check, CircleX } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
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
})

export default function ForgotPasswordForm() {
   const [ hasError, setError ] = useState<boolean>(false);
   const [ message, setMessage ] = useState<string | null>(null);
   const [ loading, setLoading ] = useState<boolean>(false);
   const [ success, setSuccess ] = useState<boolean>(false);
   
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true);
      const response = await forgotPasswordRequest(values);
      if (response.status === 200) {
         setMessage(response.message);
         setError(false);
         setLoading(false);
         setSuccess(true);
      } else {
         setMessage(response.message);
         setError(true);
         setLoading(false);
      }
   }

   return (
      <>
      {message ? (
            <Alert className={`mb-6 bg-${hasError ? 'red' : 'green'}-50 text-${hasError ? 'red' : 'green'}-700`}>
               {hasError ? <CircleX /> : <Check />}
               <AlertTitle className="text-xs mt-0.5 -ml-1">{message}</AlertTitle>
            </Alert>
         ) : null}
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <div className="flex flex-col gap-4">
                  <div className="text-gray-900 dark:text-white w-full">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input placeholder="e.g. john@email.com" {...field} onKeyUp={(e) => setMessage(null)}/>
                              </FormControl>
                              <FormMessage className="text-xs"/>
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
               <Button type="submit" disabled={loading || success} className="w-full">
                  {loading ? "Submitting..." : "Submit"}
               </Button>
            </form>
         </Form>
      </>
   );
}