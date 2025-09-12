import { Facebook, Instagram, Youtube } from "lucide-react";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
 } from "@/components/ui/dialog"
import Login from "./app-login"; 

export default function AppHeader() {
   return (
      <div className="w-full max-w-7xl flex items-center justify-between gap-2 pb-4 pt-1">
         <div className="flex items-center text-sm gap-2">
            <span className="pr-2">Follow us on</span>
            <div className="flex items-center gap-2">
               <span className="p-2 rounded-full bg-gray-100">
                  <Facebook className="w-4 h-4"/>
               </span>
            </div>
            <div className="flex items-center gap-1">
               <span className="p-2 rounded-full bg-gray-100">
                  <Instagram className="w-4 h-4"/>
               </span>
            </div>
            <div className="flex items-center gap-1">
               <span className="p-2 rounded-full bg-gray-100">
                  <Youtube className="w-4 h-4"/>
               </span>
            </div>
         </div>
         <div className="flex items-center gap-4 text-sm">
            <Dialog>
               <DialogTrigger className="uppercase">Login</DialogTrigger>
               <DialogContent showCloseButton={false}>
                  <DialogHeader>
                     <DialogTitle className="sr-only">Login Dialog</DialogTitle>
                     <DialogDescription className="sr-only"/>
                     <Login/>
                  </DialogHeader>
               </DialogContent>
            </Dialog>

            <Dialog>
               <DialogTrigger className="uppercase">Signup</DialogTrigger>
               <DialogContent>
                  <DialogHeader>
                     <DialogTitle>Are you absolutely sure?</DialogTitle>
                     <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                     </DialogDescription>
                  </DialogHeader>
               </DialogContent>
            </Dialog>
         </div>
      </div>
   );
}