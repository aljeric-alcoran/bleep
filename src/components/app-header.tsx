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

export default function AppHeader() {
   const { step } = useSignup();
   const [open, setOpen] = useState(false);
   const { user, justLoggedIn, setJustLoggedIn } = useUserStore();
   const toastShown = useRef(false);

   useEffect(() => {
      if (justLoggedIn && user && !toastShown.current) {
         console.log("Called: justLoggedIn", justLoggedIn);
         toast.success("Login successful.", {
            description: `Welcome back, ${
               user ? `${user.firstname} ${user.lastname}` : "User"
            }!`,
         });
         toastShown.current = true;
         setJustLoggedIn(false);
      }
   }, [justLoggedIn, user, setJustLoggedIn]);

   return (
      <div className="w-full max-w-7xl flex items-center justify-between gap-2 pb-4 pt-1">
         <div className="flex items-center text-sm gap-1 pt-2">
            <span className="pr-2">Follow us on</span>
            <div className="flex items-center gap-2">
               <span className="p-[2px] rounded-sm border-[2px] border-white">
                  <Facebook className="w-[11.2px] h-[11.2px]"/>
               </span>
            </div>
            <div className="flex items-center gap-1">
               <Instagram className="w-5 h-5"/>
            </div>
         </div>
         {!user ? (
            <div className="flex items-center gap-2 text-sm">
               <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger className="cursor-pointer hover:underline">Login</DialogTrigger>
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
               |
               <Dialog>
                  <DialogTrigger className="cursor-pointer hover:underline">Signup</DialogTrigger>
                  <DialogContent 
                     className={step === 3 ? 'sm:max-w-lg' : 'sm:max-w-md'}
                     onInteractOutside={(e) => e.preventDefault()}
                     onEscapeKeyDown={(e) => e.preventDefault()}
                  >
                     <DialogHeader>
                        <DialogTitle className="sr-only">Login Dialog</DialogTitle>
                        <DialogDescription className="sr-only"/>
                        <Signup/>
                     </DialogHeader>
                  </DialogContent>
               </Dialog>
            </div>
         ) : (
            <div className="flex items-center gap-2 text-sm">
               <UserProfileDropdown user={user} />
            </div>
         )}
      </div>
   );
}