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

export function NavMain({
   label,
   items
}: {
   label: string;
   items: {
      title: string
      url: string
      icon: LucideIcon
   }[];
}) {
   const pathname = usePathname();
   return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden pl-0">
         <SidebarGroupLabel className="uppercase text-[0.65rem] text-muted-foreground">{label}</SidebarGroupLabel>
         <SidebarMenu>
            {items.map((item) => {
               const isActive = (pathname === item.url);;
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
      </SidebarGroup>
   )
}