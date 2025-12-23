"use client"

import { Button } from "@/components/ui/button";
import { Item, ItemContent } from "@/components/ui/item";
import { Skeleton } from '@/components/ui/skeleton';
import { Plus } from "lucide-react";

export default function LoadingSkeleton() {
   return (
      <>
         <Button size="sm" className="mt-6 rounded-sm" disabled>
            <Plus />
            Add Product
         </Button>
         <div className="mt-4 grid grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
               <div key={i} className="w-full">
                  <Item variant="outline" className="p-0 overflow-hidden shadow-none h-full">
                     <ItemContent className="gap-0">
                        <div className="w-full h-[200px] relative border-b">
                           <Skeleton className="h-full w-full rounded-none" />
                        </div>
                        <div className="p-3">
                           <Skeleton className="h-[16px] w-30" />
                           <Skeleton className="h-[12px] w-48 mt-1" />
                           <div className="mt-4">
                              <Skeleton className="h-[24px] w-30" />
                           </div>
                           <div className="mt-4">
                              <Skeleton className="h-[12px] w-48" />
                           </div>
                        </div>
                     </ItemContent>
                  </Item>
               </div>
            ))}
         </div>
      </>
   )
}