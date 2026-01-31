import Link from "next/link";
import Image from "next/image";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import BleepBrand from "./bleep-brand";

export default function SearchMain({
   inputWidth = 'full'
}: {
   inputWidth?: string
}) {
   return (
      <>
         <div className={`flex w-full items-center gap-2 relative pl-10 max-w-[${inputWidth}]`}>
            <Input id="main-search" type="input" placeholder="Search here..." className="py-[20px] rounded-[4px] pl-4 pr-6 bg-white" />
            <Button type="submit" variant="outline" className="absolute cursor-pointer hover:text-white right-[3px] w-18 bg-primary hover:bg-primary/80 text-white rounded-[4px]">
               <Search/>
            </Button>
         </div>
      </>
   );
}