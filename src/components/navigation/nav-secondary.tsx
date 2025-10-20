"use client"
import * as React from "react"
import { CircleQuestionMark, Settings, type LucideIcon   } from "lucide-react"
import {
   SidebarGroup,
   SidebarGroupContent,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

const items = [
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

export function NavSecondary({
   ...props
} : React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
   const pathname = usePathname()
   return (
      <SidebarGroup {...props} className="pl-0">
         <SidebarGroupContent>
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
   )
}