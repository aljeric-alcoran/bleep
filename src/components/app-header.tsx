'use client'

import Login from "./app-login"; 
import Signup from "./app-signup";
import { Facebook, Instagram } from "lucide-react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { useSignup } from "@/app/context/SignupContext";
import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import { toast } from "sonner";
import UserProfileDropdown from "./header/user-profile-dropdown";
import { Skeleton } from "@/components/ui/skeleton";

export default function AppHeader() {
   const user = useUserStore((state) => state.user);
   const loading = useUserStore((state) => state.loading);
   const justLoggedIn = useUserStore((state) => state.justLoggedIn);
   const setJustLoggedIn = useUserStore((state) => state.setJustLoggedIn);

   const { step } = useSignup();
   const [open, setOpen] = useState(false);
   const [openSignup, setOpenSignup] = useState(false);
   const toastShown = useRef(false);

   // Reset toast gate on logout so it fires again on next login
   useEffect(() => {
      if (!user) toastShown.current = false;
   }, [user]);

   useEffect(() => {
      if (!justLoggedIn || !user || toastShown.current) return;
    
      toast.success("Login successful.", {
         description: `Welcome, ${user.firstname} ${user.lastname}!`,
      });
    
      toastShown.current = true;
      setJustLoggedIn(false);
   }, [justLoggedIn, user, setJustLoggedIn]);

   const renderAuthSection = () => {
      // While session is being validated, show a skeleton
      // to prevent layout shift and the login/signup flashing into view
      if (loading) {
         return (
            <div className="flex items-center gap-1">
               <Skeleton className="h-4 w-24 bg-red-400/75" />
               <Skeleton className="h-4 w-4 bg-red-400/75" />
            </div>
         );
      }

      if (user) {
         return <UserProfileDropdown user={user} />;
      }

      return (
         <div className="flex items-center gap-2 text-sm">
            <Dialog open={open} onOpenChange={setOpen}>
               <DialogTrigger className="cursor-pointer hover:underline uppercase text-xs">
                  Login
               </DialogTrigger>
               <DialogContent 
                  className="sm:max-w-md"
                  onInteractOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
               >
                  <DialogHeader>
                     <DialogTitle className="sr-only">Login Dialog</DialogTitle>
                     <DialogDescription className="sr-only"/>
                     <Login onSuccess={() => setOpen(false)}/>
                  </DialogHeader>
               </DialogContent>
            </Dialog>
            <span className="text-xs">|</span>
            <Dialog open={openSignup} onOpenChange={setOpenSignup}>
               <DialogTrigger className="cursor-pointer hover:underline uppercase text-xs">
                  Signup
               </DialogTrigger>
               <DialogContent 
                  className={step === 3 ? 'sm:max-w-lg' : 'sm:max-w-md'}
                  onInteractOutside={(e) => e.preventDefault()}
                  onEscapeKeyDown={(e) => e.preventDefault()}
               >
                  <DialogHeader>
                     <DialogTitle className="sr-only">Signup Dialog</DialogTitle>
                     <DialogDescription className="sr-only"/>
                     <Signup onSuccess={() => setOpenSignup(false)}/>
                  </DialogHeader>
               </DialogContent>
            </Dialog>
         </div>
      );
   };

   return (
      <div className="w-full max-w-7xl flex items-center justify-between gap-2 pb-4 pt-1">
         <div className="flex items-center text-sm gap-1 pt-2">
            <span className="pr-2 uppercase text-xs">Follow us on</span>
            <div className="flex items-center gap-2">
               <span className="p-[2px] rounded-sm border-[2px] border-white">
                  <Facebook className="w-[11.2px] h-[11.2px]"/>
               </span>
            </div>
            <div className="flex items-center gap-1">
               <Instagram className="w-5 h-5"/>
            </div>
         </div>

         <div className="flex items-center gap-2 text-sm">
            {renderAuthSection()}
         </div>
      </div>
   );
}