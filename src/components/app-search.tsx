import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Search, ShoppingCart } from "lucide-react";

export default function AppSearch() {
   return (
      <div className="w-full max-w-7xl flex flex-wrap justify-between items-center py-5">
         <div className="w-full flex items-center justify-between gap-10">
            <div className="flex gap-2 items-center mr-4">
               <Image
                  src="/logo-white.png"
                  width={38}
                  height={38}
                  alt="Bleep logo"
                  priority
               />
               <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Bleep</span>
            </div>
            <div className="flex w-full items-center gap-2 relative pl-10">
               <Input id="main-search" type="input" placeholder="Search here..." className="py-[20px] rounded-[4px] px-6 bg-white" />
               <Button type="submit" variant="outline" className="absolute cursor-pointer hover:text-white right-[3px] w-18 bg-primary hover:bg-primary/80 text-white rounded-[4px]">
                  <Search/>
               </Button>
            </div>
            <div className="flex items-center gap-2">
               <div className="p-2">
                  <Link href="/login">
                     <ShoppingCart className="w-6 h-6 font-semibold" />
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
}