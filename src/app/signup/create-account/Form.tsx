'use client'

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

const formSchema = z.object({
   otp: z.string(),
   email: z.email(),
   firstname: z.string().max(50).min(2, "First name must be at least 2 characters"),
   lastname: z.string().max(50).min(2, "Last name must be at least 2 characters"),
   phoneNumber: z.string().length(10, "Phone number must be 10 digits"),
   countryCode: z.string().nonempty("Select a code"),
   password: z.string().min(8, "Password must be at least 8 characters"),
})

export default function RegistrationForm({
   verifiedEmail,
   otp
}: Readonly<{
   verifiedEmail: string | null;
   otp: string | null;
}>) {
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         otp: otp ?? "",
         email: verifiedEmail  ?? "",
         firstname: "",
         lastname: "",
         password: "",
         countryCode: "+63",
         phoneNumber: "",
      },
   })

   async function onSubmit(values: z.infer<typeof formSchema>) {
      values.phoneNumber = values.countryCode + values.phoneNumber;
      const {countryCode,...userObject} = values;
      const response  = await registerUser(userObject);
      console.log({ userObject });
   }

   return (
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
            <Button type="submit" className="w-full">Submit</Button>
         </form>
      </Form>
   );
}