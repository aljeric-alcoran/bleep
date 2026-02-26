"use client"

import Image from "next/image";
import { fetchActiveCategories } from "@/lib/api/categories";
import { Category } from "@/@types";
import { useQuery } from "@tanstack/react-query";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppHomeCategories() {
   const { isLoading, data } = useQuery({ queryKey: ["categories"], queryFn: fetchActiveCategories });
   const scrollRef = useRef<HTMLDivElement>(null);
   const [canScrollLeft, setCanScrollLeft] = useState(false);
   const [canScrollRight, setCanScrollRight] = useState(false);

   const checkScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
   };

   useEffect(() => {
      checkScroll();
      const el = scrollRef.current;
      el?.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
         el?.removeEventListener("scroll", checkScroll);
         window.removeEventListener("resize", checkScroll);
      };
   }, [data]);

   const scroll = (direction: "left" | "right") => {
      scrollRef.current?.scrollBy({ left: direction === "left" ? -200 : 200, behavior: "smooth" });
   };

   return (
      <div className="w-full border border-gray-200 rounded-sm bg-white">
         <div className="uppercase text-sm font-semibold p-5 border-b">
            Categories
         </div>
         <div className="relative flex items-center">
            {canScrollLeft && (
               <Button
                  onClick={() => scroll("left")}
                  className="absolute -left-4 z-10 flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
               >
                  <ChevronLeft className="w-4 h-4 text-gray-500" />
               </Button>
            )}

            <div
               ref={scrollRef}
               className="flex items-center w-full overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
            >
               {data?.map((category: Category) => (
                  <div
                     key={category._id}
                     className="min-w-35 flex-shrink-0 flex flex-col items-center gap-2 border-r border-gray-200 py-5 hover:shadow-xs cursor-pointer last:border-r-0"
                  >
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

            {canScrollRight && (
               <Button
                  onClick={() => scroll("right")}
                  className="absolute -right-4 z-10 flex items-center justify-center w-8 h-8 bg-white border border-gray-200 rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
               >
                  <ChevronRight className="w-4 h-4 text-gray-500" />
               </Button>
            )}
         </div>
      </div>
   );
}