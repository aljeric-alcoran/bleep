"use client"

import EmptyProduct from "@/app/(account)/products/EmptyProduct";
import LoadingSkeleton from "@/app/(account)/products/LoadingSkeleton";
import ProductCard from "@/app/(account)/products/ProductCard";
import { fetchProducts } from "@/lib/api/products";
import { Product } from "@/@types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function AppProductListings() {
   const { isLoading, isError, data, error } = useQuery({ queryKey:  ["products"], queryFn: fetchProducts});
   const hasProducts = data?.data.length > 0;
   const [open, setOpen] = useState<boolean>(false);
   
   return (
      <>
         {isLoading && <LoadingSkeleton />}

         {!isLoading && !hasProducts && <EmptyProduct setOpen={setOpen}/>}

         {!isLoading && hasProducts && (
            <>
               <div className="mt-6 grid grid-cols-6 gap-3">
                  {data?.data.map((product: Product) => (
                     <ProductCard key={product._id} product={product}/>
                  ))}
               </div>
            </>
         )}
      </>
   );
}