import { registerUser } from "@/lib/api/registration";
import { z } from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import { 
   Select, 
   SelectContent, 
   SelectItem, 
   SelectTrigger, 
   SelectValue 
} from "@/components/ui/select";
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "@/components/ui/form"
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleX, Loader } from "lucide-react";
import { useSignup } from "@/app/context/SignupContext";

const formSchema = z.object({
   otp: z.string(),
   email: z.email(),
   firstname: z.string().max(50).min(2, "First name must be at least 2 characters"),
   lastname: z.string().max(50).min(2, "Last name must be at least 2 characters"),
   phoneNumber: z.string().length(10, "Phone number must be 10 digits"),
   countryCode: z.string().nonempty("Select a code"),
   password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function RegistrationForm() {
   const router = useRouter();
   const { email, otp } = useSignup();
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(false);

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         otp: otp ?? "",
         email: email  ?? "",
         firstname: "",
         lastname: "",
         password: "",
         countryCode: "+63",
         phoneNumber: "",
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true);
      values.phoneNumber = values.countryCode + values.phoneNumber;
      const { countryCode,...userObject } = values;
      const response  = await registerUser(userObject);

      if (response.status === 200) {
         setLoading(false);
         router.push("/dashboard");
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
                  <div className="text-gray-900 dark:text-white pt-6 space-y-6">
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input disabled {...field} />
                              </FormControl>
                              <FormMessage className="text-xs"/>
                           </FormItem>
                        )}
                     />

                     <div className="grid grid-cols-2 gap-4 items-start">
                        <FormField
                           control={form.control}
                           name="firstname"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>First Name</FormLabel>
                                 <FormControl>
                                    <Input placeholder="e.g. John" {...field} />
                                 </FormControl>
                                 <FormMessage className="text-xs"/>
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="lastname"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Last Name</FormLabel>
                                 <FormControl>
                                    <Input placeholder="e.g. Doe" {...field} />
                                 </FormControl>
                                 <FormMessage className="text-xs"/>
                              </FormItem>
                           )}
                        />
                     </div>
                     <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                 <div className="flex gap-2">
                                    <FormField
                                       control={form.control}
                                       name="countryCode"
                                       render={({ field: ccField }) => (
                                          <Select
                                             defaultValue={ccField.value}
                                             onValueChange={ccField.onChange}
                                          >
                                             <SelectTrigger className="w-[75px]">
                                                <SelectValue placeholder="Code" />
                                             </SelectTrigger>
                                             <SelectContent>
                                                <SelectItem value="+63">+63</SelectItem>
                                             </SelectContent>
                                          </Select>
                                       )}
                                    />

                                    <Input type="tel" placeholder="9123456789"
                                       {...field}
                                       onChange={(e) => {
                                          const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                                          field.onChange(digits);
                                       }}
                                       className="flex-1"
                                    />
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                           control={form.control}
                           name="password"
                           render={({ field }) => (
                              <FormItem>
                                 <FormLabel>Password</FormLabel>
                                 <FormControl>
                                    <Input type="password" placeholder="Enter your password..." {...field} />
                                 </FormControl>
                                 <FormMessage className="text-xs"/>
                              </FormItem>
                           )}
                        />
                  </div>
               </div>
               <Button type="submit" className="w-full hover:bg-red-700 cursor-pointer">
                  Submit
                  {loading && <Loader className="animate-spin"/>}
               </Button>
            </form>
         </Form>
      </>
   );
}