"use client"
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/useUserStore";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { formatDateWithOrdinal } from "@/lib/helpers";

export default function ProfileCard() {
   const { user } = useUserStore();
   const setShowEditProfile = useUserStore(state => state.setShowEditProfile);
   const loading = useUserStore(state => state.loading);
   return (
      <>
         <div className="grid grid-flow-row grid-cols-3 gap-4">
            <div className="space-y-6 px-7 pb-6">
               <div className="space-y-2">
                  <Label className="font-normal text-xs text-muted-foreground">
                     First Name
                  </Label>
                  <div className="text-sm border border-gray-100 p-2 px-3">
                     {  
                        loading 
                        ? <Skeleton className="h-[21px] rounded-none" /> 
                        : (user?.firstname ?? 'Enter first name.')
                     }
                  </div>
               </div>

               <div className="space-y-2">
                  <Label className="font-normal text-xs text-muted-foreground">
                     Last Name
                  </Label>
                  <div className="text-sm border border-gray-100 p-2 px-3">
                     {  
                        loading 
                        ? <Skeleton className="h-[21px] rounded-none" /> 
                        : (user?.lastname ?? 'Enter last name.')
                     }
                  </div>
               </div>
            </div>
            <div className="space-y-2 px-6">
               <Label className="font-normal text-xs text-muted-foreground">
                  Email Address |
                  <Link href="#" className="text-primary -ml-1">{user?.email ? 'Change' : 'Add'}</Link>
               </Label>
               <div className="text-sm border border-gray-100 p-2 px-3">
                  {  
                     loading 
                     ? <Skeleton className="h-[21px] rounded-none" /> 
                     : (user?.email ?? "Please enter your email address")
                  }
               </div>
            </div>
            <div className="space-y-2 px-6">
               <Label className="font-normal text-xs text-muted-foreground">
                  Mobile Number |
                  <Link href="#" className="text-primary -ml-1">{user?.phoneNumber ? 'Change' : 'Add'}</Link>
               </Label>
               <div className="text-sm border border-gray-100 p-2 px-3">
                  {  
                     loading 
                     ? <Skeleton className="h-[21px] rounded-none" /> 
                     : (user?.phoneNumber ?? "Please enter your mobile number")
                  }
               </div>
            </div>

            <div className="space-y-2 px-7">
               <Label className="font-normal text-xs text-muted-foreground">
                  Birthday
               </Label>
               <div className="flex items-center justify-between text-sm border border-gray-100 p-2 px-3">
                  {  
                     loading 
                     ? <Skeleton className="h-[21px] w-[180px] rounded-none" /> 
                     : (
                        user?.birthday
                          ? formatDateWithOrdinal(user.birthday)
                          : "Pick a date"
                      )
                  }
                  <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
               </div>
            </div>

            <div className="space-y-2 px-6">
               <Label className="font-normal text-xs text-muted-foreground">
                  Gender
               </Label>
               <div className="w-[180px] flex items-center justify-between text-sm border border-gray-100 p-2 px-3 capitalize">
                  {  
                     loading 
                     ? <Skeleton className="h-[21px] w-[120px] rounded-none" /> 
                     : (user?.gender ?? "Select Gender")
                  }
                  <ChevronDown className="h-4 w-4 text-gray-400"/>
               </div>
            </div>
         </div>
         <div className="px-7 my-8">
            {loading  ? '' : (
               <div className="space-x-2">
                  <Button type="button" onClick={setShowEditProfile} className="rounded-none font-normal" size="lg">Edit Profile</Button>
                  <Button type="button" className="rounded-none font-normal" size="lg">Change Password</Button>
               </div>
            )}
         </div>
      </>
   )
}