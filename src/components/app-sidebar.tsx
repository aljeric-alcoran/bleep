import { 
   CircleGauge, 
   CircleUserRound, 
   Settings, ShoppingBasket, 
   CircleQuestionMark
} from "lucide-react"
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavSecondary } from "./nav-secondary";
 
const items = [
   {
      title: "Dashboard",
      url: "#",
      icon: CircleGauge,
   },
   {
      title: "My Account",
      url: "#",
      icon: CircleUserRound,
   },
   {
      title: "My Orders",
      url: "#",
      icon: ShoppingBasket,
   }
]

const navSecondary = [
   {
     title: "Settings",
     url: "#",
     icon: Settings,
   },
   {
     title: "Get Help",
     url: "#",
     icon: CircleQuestionMark,
   },
]
 
export function AppSidebar() {
   return (
      <div className="w-54 bg-white">
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupContent className="py-5">
                  <SidebarMenu>
                     {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                           <SidebarMenuButton asChild>
                           <a href={item.url}>
                              <item.icon />
                              <span>{item.title}</span>
                           </a>
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarGroupContent>
            </SidebarGroup>
            <NavSecondary items={navSecondary} className="mt-auto" />
         </SidebarContent>
      </div>
   )
}
