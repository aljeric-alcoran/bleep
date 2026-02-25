"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useUserFormSchema, UserFormSchema } from "@/schema/user.schema";
import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import { updateUserDetails } from "@/lib/api/users";
import { toast } from "sonner";

export default function UserProfileForm() {
   const { user, justLoggedIn, setJustLoggedIn, updateUserFromStore } = useUserStore();
   const setShowEditProfile = useUserStore(state => state.setShowEditProfile);
   const userForm = useUserFormSchema(user);

   async function onSubmit(values: UserFormSchema): Promise<void> {
      const { birthday, ...data } = values;
      const payload = {
         _id: user?._id!,
         ...data,
         phoneNumber: user?.phoneNumber,
         email: user?.email!,
         birthday: values.birthday ? values.birthday : undefined
      }
      const response = await updateUserDetails(payload, user?._id);
      updateUserFromStore(response.user, 
         () => {
            resetUserForm();
            setShowEditProfile();
            toast.success("Success!", { 
               description: 'Profile has been updated!' 
            })
         }
      );
   }

   const resetUserForm = () => {
      userForm.reset({
         firstname: user?.firstname || "",
         lastname: user?.lastname || "",
      })
   }

   function cancelEditProfile(event?: React.MouseEvent<HTMLButtonElement>) {
      event?.preventDefault();
      setShowEditProfile();
   }

   useEffect(() => {
      if (justLoggedIn && user) {
         setJustLoggedIn(false);
      }
      resetUserForm();
   }, [justLoggedIn, user, setJustLoggedIn]);

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
                              <Input className="rounded-none" autoFocus {...field} />
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
                              <Input className="rounded-none" {...field} />
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />
               </div>

               <div className="space-y-2 px-6">
                  <Label className="font-normal text-xs text-muted-foreground">
                     Email Address |
                     <Link href="#" className="text-primary -ml-1">{user?.email ? 'Change' : 'Add'}</Link>
                  </Label>
                  <div className="text-sm border border-gray-100 p-2 px-3">
                     {user?.email ?? "Please enter your email address"}
                  </div>
               </div>
               <div className="space-y-2 px-6">
                  <Label className="font-normal text-xs text-muted-foreground">
                     Mobile Number |
                     <Link href="#" className="text-primary -ml-1">{user?.phoneNumber ? 'Change' : 'Add'}</Link>
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
                                 captionLayout="dropdown"
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
               <div className="space-x-2">
                  <Button type="submit" disabled={!userForm.formState.isDirty} className="rounded-none font-normal" size="lg">Submit</Button>
                  <Button onClick={cancelEditProfile} variant="outline" className="rounded-none font-normal" size="lg">Cancel</Button>
               </div>
            </div>
         </form>
      </Form>
   )
}