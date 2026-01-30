"use client"

import { Product } from "@/@types";
import { Button } from "@/components/ui/button";
import { MessageSquareMore, Store } from "lucide-react";
import Image from "next/image";

export default function ProductStore({ 
   product 
}: { 
   product: Product
}) {
   return (
      <div className="w-full shadow rounded-sm bg-white mt-5 p-5">
         <div className="flex items-center gap-4">
            <Image 
               src={"/default-product.jpg"}
               loading="eager"
               width={500}
               height={500}
               className="border w-20 h-20 rounded-sm"
               alt="Picture of the author"
            />
            <div className="flex flex-col gap-4">
               <h2 className="font-medium">{ product.establishment?.name }</h2>
               <div className="flex space-x-2">
                  <Button 
                     type="button" 
                     variant="outline" 
                     className="border-red-500 text-xs w-28 bg-red-50 rounded-xs text-red-600 flex items-center gap-2 cursor-pointer hover:text-red-600 hover:bg-white" 
                     size="sm"
                  >
                     <MessageSquareMore/>
                     Chat Now
                  </Button>
                  <Button type="button" variant="secondary" className="border border-gray-900 text-xs w-28 cursor-pointer rounded-xs" size="sm">
                     <Store/>
                     View Store
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}