'use client'

import { NavUser } from "@/components/navbar-user";
import { useUserStore } from "@/store/useUserStore";

export default function Dashboard() {
   const user = useUserStore((state) => state.user);
   return (
      <div className="flex">
         <div className="h-dvh border">
            <NavUser user={user}/>
         </div>
         <div>
            <h1>Welcome to dashboard</h1>
         </div>
      </div>
   );
}