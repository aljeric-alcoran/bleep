"use client"

import Link from "next/link";
import { Product } from "@/@types";
import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
   BreadcrumbList,
   BreadcrumbSeparator,
 } from "@/components/ui/breadcrumb"

export default function ProductDescription({ 
   product 
} : { 
   product: Product 
}) {
   return (
      <div className="w-full shadow rounded-sm bg-white mt-5 p-5 space-y-10">
         <div>
            <h2 className="rounded-xs py-2 px-4 bg-gray-100 text-md font-medium">Product Specification</h2>
            <div className="px-4 text-sm mt-5 space-y-5">
            <div className="flex items-center gap-8">
                  <p className="text-gray-500 w-35">Category</p>
                  <Breadcrumb>
                     <BreadcrumbList>
                        <BreadcrumbItem>
                           <BreadcrumbLink className="text-primary hover:text-red-400" asChild>
                              <Link href="/">Bleep</Link>
                           </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="text-primary"/>
                        <BreadcrumbItem>
                           <BreadcrumbLink className="text-primary hover:text-red-400">{product.category?.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                     </BreadcrumbList>
                  </Breadcrumb>
               </div>
               <div className="flex items-center gap-8">
                  <p className="text-gray-500 w-35">Ships From</p>
                  <p>{product.establishment?.address}</p>
               </div>
            </div>
         </div>

         <div>
            <h2 className="rounded-xs py-2 px-4 bg-gray-100 text-md font-medium">Product Description</h2>
            <div className="px-4 text-sm mt-5">
               {product.description}
            </div>
         </div>
      </div>
   )
}