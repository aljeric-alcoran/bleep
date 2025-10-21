"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserFormSchema } from "@/schema/user.schema";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { useState } from "react";
import { User } from "@/lib/types/user-type";

export default function UserProfileForm({
   user,
   userForm,
   onSubmit,
   resetUserForm
} : {
   user: User | null;
   userForm: UseFormReturn<UserFormSchema>;
   onSubmit: (values: UserFormSchema) => Promise<void>;
   resetUserForm: () => void;
}) {
   const [disabled, setDisabled] = useState(true);

   const showEditProfile = () => {
      setDisabled(!disabled);
      if (!disabled) {
         resetUserForm();
      }
   }
   return (
      <Form {...userForm}>
         <form onSubmit={userForm.handleSubmit(onSubmit)}>
            <div className="grid grid-flow-row grid-cols-3 gap-4">
               <div className="space-y-6 px-7 pb-6">
                  <FormField
                     control={userForm.control}
                     name="firstname"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="font-normal text-xs text-muted-foreground">First Name</FormLabel>
                           <FormControl>
                              <Input disabled={disabled} className="rounded-none" {...field} />
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={userForm.control}
                     name="lastname"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="font-normal text-xs text-muted-foreground">Last Name</FormLabel>
                           <FormControl>
                              <Input disabled={disabled} className="rounded-none" {...field} />
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />
               </div>
               <div className="space-y-2 px-6">
                  <Label className="font-normal text-xs text-muted-foreground">
                     Email Address |
                     <Link href="#" className="text-primary -ml-1">Change</Link>
                  </Label>
                  <div className="text-sm border border-gray-100 p-2 px-3">
                     {user?.email ?? "Please enter your emmail address"}
                  </div>
               </div>
               <div className="space-y-2 px-6">
                  <Label className="font-normal text-xs text-muted-foreground">
                     Mobile Number |
                     <Link href="#" className="text-primary -ml-1">Add</Link>
                  </Label>
                  <div className="text-sm border border-gray-100 p-2 px-3">
                     {user?.phoneNumber ?? "Please enter your mobile number"}
                  </div>
               </div>
               <div className="space-y-3 px-7">
                  <FormField
                     name="birthday"
                     control={userForm.control}
                     render={({ field }) => (
                        <Popover>
                           <Label className="font-normal text-xs text-muted-foreground mb-2">Birthday</Label>
                           <PopoverTrigger asChild>
                              <Button
                                 disabled={disabled}
                                 variant="outline"
                                 data-empty={!field.value}
                                 className="data-[empty=true]:text-muted-foreground rounded-none w-full justify-between font-normal"
                              >
                                 {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                 <CalendarIcon className="mr-2 h-4 w-4" />
                              </Button>
                           </PopoverTrigger>

                           <PopoverContent className="w-auto p-0">
                              <Calendar
                                 mode="single"
                                 selected={field.value}
                                 onSelect={field.onChange}
                                 disabled={(date) => date > new Date()}
                              />
                           </PopoverContent>
                        </Popover>
                     )}
                  />
               </div>
               <div className="space-y-3 px-6">
                  <Label className="font-normal text-xs text-muted-foreground mb-2">Gender</Label>
                  <FormField
                     name="gender"
                     control={userForm.control}
                     render={({ field }) => (
                        <FormItem>
                           <Select 
                              disabled={disabled}
                              onValueChange={field.onChange}
                              value={field.value ?? ""}
                           >
                              <FormControl>
                                 <SelectTrigger className="w-[180px] rounded-none">
                                    <SelectValue placeholder="Select Gender" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="male">Male</SelectItem>
                                 <SelectItem value="female">Female</SelectItem>
                                 <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                           </Select>
                        </FormItem>
                     )}
                  />
               </div>
            </div>
            <div className="px-7 my-8">
               {disabled ? (
                  <div className="space-x-2">
                     <Button onClick={showEditProfile} className="rounded-none font-normal" size="lg">Edit Profile</Button>
                     <Button className="rounded-none font-normal" size="lg">Change Password</Button>
                  </div>
               ) : (
                  <div className="space-x-2">
                     <Button type="submit" className="rounded-none font-normal" size="lg">Save</Button>
                     <Button onClick={showEditProfile} variant="outline" className="rounded-none font-normal" size="lg">Discard</Button>
                  </div>
               )}
            </div>
         </form>
      </Form>
   )
}