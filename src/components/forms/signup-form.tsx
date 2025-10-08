import { requestEmailVerification } from "@/lib/api/registration";
import { useState } from "react";
import { useSignup } from "@/app/context/SignupContext";

import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
 } from "@/components/ui/form"
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleX, Loader } from "lucide-react";

const formSchema = z.object({
   email: z.email(),
})

export default function SignupForm() {
   const { setEmail, setStep } = useSignup();
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         email: "",
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true);
      setEmail(values.email);
      const response = await requestEmailVerification(values.email);

      if (response.status === 200) {
         setLoading(false);
         setStep(2);
      } else {
         setLoading(false);
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
               </div>
               <Button type="submit" className="w-full hover:bg-red-700 cursor-pointer">
                  Send Verification Code
                  {loading && <Loader className="animate-spin"/>}
               </Button>
            </form>
         </Form>
      </>
   );
}