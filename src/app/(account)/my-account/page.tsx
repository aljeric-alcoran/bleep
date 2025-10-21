"use client"

import UserProfileForm from "@/components/forms/profile-form";
import { useUserForm, UserFormSchema } from "@/schema/user.schema";
import { SquareUserRound } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { toISOStringDateFormat } from "@/lib/helpers";

export default function MyAccount() {
   const { user, justLoggedIn, setJustLoggedIn } = useUserStore();
   const userForm = useUserForm(user);
   
   async function onSubmit(values: UserFormSchema): Promise<void> {
      const { birthday, ...data } = values;
      const payload = {
         ...data,
         birthday: toISOStringDateFormat(values.birthday)
      }
      console.log(payload);
   }

   function resetUserForm() {
      userForm.reset({
         firstname: user?.firstname || "",
         lastname: user?.lastname || "",
      })
   }

   useEffect(() => {
      if (justLoggedIn && user) {
         setJustLoggedIn(false);
      }
      resetUserForm();
   }, [justLoggedIn, user, setJustLoggedIn]);
   return (
      <>
         <div className="flex items-center gap-2">
            <SquareUserRound className="w-5"/>
            <h1 className="text-lg font-semibold">Profile Information</h1>
         </div>

         <div className="mt-10">
            <UserProfileForm 
               user={user} 
               userForm={userForm} 
               resetUserForm={resetUserForm}
               onSubmit={onSubmit}
            />
         </div>
      </>
   );
}