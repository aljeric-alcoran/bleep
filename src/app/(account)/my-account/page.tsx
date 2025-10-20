import { CircleUserRound } from "lucide-react";

export default function MyAccount() {
   
   return (
      <div className="flex items-center gap-2">
         <CircleUserRound className="w-5"/>
         <h1 className="text-lg font-semibold">My Account</h1>
      </div>
   );
}