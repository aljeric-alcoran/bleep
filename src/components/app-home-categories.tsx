"use client"

import { fetchActiveCategories } from "@/lib/api/categories";
import { Category } from "@/@types";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function AppHomeCategories() {
   const { isLoading, data } = useQuery({ queryKey: ["categories"], queryFn: fetchActiveCategories});

   return (
      <>
         <div className="w-full border border-gray-200 rounded-sm bg-white">
            <div className="uppercase text-sm font-semibold p-5 border-b">
               Categories
            </div>
            <div className="flex items-center no-scrollbar overflow-x-scroll">
               {data?.map((category: Category) => (
                  <div key={category._id} className="w-35 flex flex-col items-center gap-2 border-r border-gray-200 py-5 hover:shadow-xs cursor-pointer">
                     <div className="relative w-20 h-20">
                        {category.image && (
                           <Image
                              src={category.image}
                              alt={category.name}
                              width={600}
                              height={600}
                           />
                        )}
                     </div>
                     <span className="text-xs text-center">{category.name}</span>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}