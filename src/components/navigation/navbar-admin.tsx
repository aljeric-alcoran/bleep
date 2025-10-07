"use client"
import { type LucideIcon } from "lucide-react"
import {
   SidebarGroup,
   SidebarGroupLabel,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

export function NavAdmin({
   items
}: {
   items: {
      name: string
      url: string
      icon: LucideIcon
   }[]
}) {
   const pathname = usePathname();
   return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden pl-0">
         <SidebarGroupLabel>Admin</SidebarGroupLabel>
         <SidebarMenu>
            {items.map((item) => {
               const isActive = pathname.startsWith(`/${item.url}`);
               return (
                  <SidebarMenuItem
                     key={item.name}
                     className={isActive ? "bg-gray-100 rounded-sm" : ""}
                  >
                     <SidebarMenuButton asChild>
                        <Link href={item.url} className="flex items-center gap-2">
                           <item.icon/>
                           <span>{item.name}</span>
                        </Link>
                     </SidebarMenuButton>
                  </SidebarMenuItem>
               );
            })}
         </SidebarMenu>
      </SidebarGroup>
   )
}