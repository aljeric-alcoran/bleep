import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, CircleUserRound, Cog, LogOut, ShoppingBasket } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { logoutUser } from "@/lib/api/auth"
import { getNameInitials } from "@/lib/helpers"

interface User {
   firstname: string
   lastname: string
   email: string
}

export default function UserDropdown({ 
   user
} : { 
   user: User 
}) {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <div className="cursor-pointer flex items-center gap-1">
               Hi, {user?.firstname }
               <ChevronDown className="ml-auto size-4" />
            </div>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuLabel>
               <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                     {/* <AvatarImage src={user.avatar} alt={user.firstname} /> */}
                     <AvatarFallback className="rounded-lg">{
                        getNameInitials(user?.firstname, user?.lastname)
                     }</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                     <span className="truncate font-medium">{user?.firstname } {user?.lastname}</span>
                     <span className="text-muted-foreground truncate text-xs">{user.email}</span>
                  </div>
               </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               <DropdownMenuItem>
                  <CircleUserRound />
                  Manage Account
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <ShoppingBasket />
                  My Orders
               </DropdownMenuItem>
               <DropdownMenuItem>
                  <Cog/>
                  Settings
               </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logoutUser()}>
               <LogOut />
               Log out
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
      