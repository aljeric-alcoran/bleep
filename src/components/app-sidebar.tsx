import { Calendar, Home, Inbox, LogOut, Search, Settings } from "lucide-react"
import Image from "next/image"
import { NavUser } from "./navbar-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar"
 
const data = {
   user: {
     name: "Al Jeric",
     email: "alcoran@gmailcom",
     avatar: "/logo.png",
   },
}
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]
 
export function AppSidebar() {
   return (
      <Sidebar>
         <SidebarContent>
            <SidebarGroup>
               <SidebarGroupLabel>
                  <div className="flex items-center justify-center gap-2">
                     <Image src="/logo.png" width={30} height={30} alt="Bleep logo" />
                     <span className="text-lg font-semibold whitespace-nowrap dark:text-white">Bleep</span>
                  </div>
               </SidebarGroupLabel>
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
         </SidebarContent>
         <SidebarFooter>
            <NavUser user={data.user}/>
         </SidebarFooter>
      </Sidebar>
   )
}
