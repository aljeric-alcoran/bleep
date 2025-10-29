"use client"
import UserProfileForm from "@/components/forms/profile-form";
import { SquareUserRound } from "lucide-react"
import ProfileCard from "./profile-card";
import { useUserStore } from "@/store/useUserStore";

export default function MyAccount() {
   const showEditProfile = useUserStore(state => state.showEditProfile);
   return (
      <>
         <div className="flex items-center gap-2">
            <SquareUserRound className="w-5"/>
            <h1 className="text-lg font-semibold">Profile</h1>
         </div>

         <div className="mt-10">
            {
               showEditProfile 
               ? <UserProfileForm/> 
               : <ProfileCard/>
            }
         </div>
      </>
   );
}