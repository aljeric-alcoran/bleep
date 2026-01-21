"use client"

import { 
   LayoutList,
   CircleGauge,
   House,
   SquareUserRound,
   Store,
   ShoppingCart,
   Package
} from "lucide-react"
import { SidebarContent } from "@/components/ui/sidebar"
import { NavMain } from "./navigation/navbar-main";
import { NavSecondary } from "./navigation/nav-secondary";

const navbarItems = [
   {
      label: 'General',
      items: [
         {
            title: "Home",
            url: "/",
            icon: House,
         },
         {
            title: "Dashboard",
            url: "/dashboard",
            icon: CircleGauge,
         }
      ]
   },
   {
      label: 'My Account',
      items: [
         {
            title: "My Account",
            url: "/my-account",
            icon: SquareUserRound,
         },
         {
            title: "My Orders",
            url: "/my-orders",
            icon: ShoppingCart,
         }
      ]
   },
   {
      label: 'Seller',
      items: [
         {
            title: "Establishments",
            url: "/establishments",
            icon: Store,
         },
         {
            title: "Products",
            url: "/products",
            icon: Package,
         },
      ]
   },
   {
      label: 'Admin',
      items:  [
         {
           title: "Categories",
           url: "/categories",
           icon: LayoutList,
         }
      ]
   }
]

export function AppSidebar() {
   return (
      <div className="w-54 pt-4 pb-10 bg-white">
         <SidebarContent>
            {navbarItems.map((item) => (
               <NavMain 
                  key={item.label} 
                  items={item.items} 
                  label={item.label}
               />
            ))}
            <NavSecondary className="mt-auto" />
         </SidebarContent>
      </div>
   )
}
