"use client";

import Image from "next/image";
import { useRef } from "react";

const items = [
   { title: "Strong 3M Glue", img: "/default-product.jpg" },
   { title: "Wide Compatibility", img: "/default-product.jpg" },
   { title: "Mini Size Holder", img: "/default-product.jpg" },
   { title: "High Quality Material", img: "/default-product.jpg" },
   { title: "Easy To Install", img: "/default-product.jpg" },
];

export default function ProductImageSlider() {
   const sliderRef = useRef<HTMLDivElement>(null);

   const slide = (direction: "left" | "right") => {
      if (!sliderRef.current) return;

      const scrollAmount = 240;

      sliderRef.current.scrollBy({
         left: direction === "left" ? -scrollAmount : scrollAmount,
         behavior: "smooth",
      });
   };

   return (
      <div className="relative w-full max-w-[450px] mx-auto">
         <button
            onClick={() => slide("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-gray-400/25 p-2 hover:bg-gray-500/25"
         >
            ❮
         </button>

         <div
            ref={sliderRef}
            className="flex gap-3 overflow-x-hidden scroll-smooth"
         >
            {items.map((item, index) => (
               <div
                  key={index}
                  className="min-w-24 bg-white"
               >
                  <Image 
                     src={item.img}
                     alt={item.title}
                     width={240}
                     height={240}
                     className="border w-24 h-24"
                  />
                  {/* <Image
                     src={item.img}
                     alt={item.title}
                     fill
                     className="object-contain"
                  /> */}
               </div>
            ))}
         </div>

         <button
            onClick={() => slide("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-gray-400/25 p-2 hover:bg-gray-500/25"
         >
            ❯
         </button>
      </div>
   );
}