import { Facebook, Instagram, Youtube } from "lucide-react";

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
         <div className="flex items-center gap-4 uppercase text-sm">
            <span>Login</span>
            <span>Signup</span>
         </div>
      </div>
   );
}