"use client"

import { 
   CircleGauge, 
   CircleUserRound, 
   Settings, ShoppingBasket, 
   CircleQuestionMark,
   LayoutList
} from "lucide-react"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./navigation/nav-secondary";
import { NavAdmin } from "./navigation/navbar-admin";
import { usePathname } from "next/navigation";
import Link from "next/link";
 
const items = [
   {
      title: "Dashboard",
      url: "dashboard",
      icon: CircleGauge,
   },
   {
      title: "My Account",
      url: "my-account",
      icon: CircleUserRound,
   },
   {
      title: "My Orders",
      url: "my-orders",
      icon: ShoppingBasket,
   }
]

const navSecondary = [
   {
     title: "Settings",
     url: "settings",
     icon: Settings,
   },
   {
     title: "Get Help",
     url: "#",
     icon: CircleQuestionMark,
   },
]

const adminItems = [
   {
     name: "Categories",
     url: "categories",
     icon: LayoutList,
   }
]
 
export function AppSidebar() {
   const pathname = usePathname()
   return (
      <div className="w-54 pb-10 bg-white">
         <SidebarContent>
            <SidebarGroup className="pl-0">
               <SidebarGroupContent className="py-5">
                  <SidebarMenu>
                     {items.map((item) => {
                        const isActive = pathname.startsWith(`/${item.url}`);
                        return (
                           <SidebarMenuItem
                              key={item.title}
                              className={isActive ? "bg-gray-100 rounded-sm" : ""}
                           >
                              <SidebarMenuButton asChild>
                                 <Link href={item.url} className="flex items-center gap-2">
                                    <item.icon/>
                                    <span>{item.title}</span>
                                 </Link>
                              </SidebarMenuButton>
                           </SidebarMenuItem>
                        );
                     })}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
            <NavAdmin items={adminItems} />
            <NavSecondary items={navSecondary} className="mt-auto" />
         </SidebarContent>
      </div>
   )
}
