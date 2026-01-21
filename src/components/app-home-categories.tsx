"use client"

import { fetchActiveCategories } from "@/lib/api/categories";
import { Category } from "@/@types";
import { useQuery } from "@tanstack/react-query";

export default function AppHomeCategories() {
   const { isLoading, data } = useQuery({ queryKey: ["categories"], queryFn: fetchActiveCategories});
   const hasCategories = data?.length > 0;

   return (
      <>
         <div className="w-full border border-gray-200 rounded-sm bg-white">
            <div className="uppercase text-sm font-semibold p-5 border-b">
               Categories
            </div>
            <div className="flex items-center no-scrollbar overflow-x-scroll">
               {data?.map((category: Category) => (
                  <div key={category._id} className="w-35 flex flex-col items-center gap-6 border-r border-gray-200 py-5 hover:shadow-xs cursor-pointer">
                     <span className="p-2 rounded-full bg-gray-100 w-12 h-12">
                        { /* Image here */}
                     </span>
                     <span className="text-xs text-center">{category.name}</span>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}