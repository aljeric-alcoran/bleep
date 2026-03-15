"use client"

import EmptyProduct from "@/app/(account)/products/EmptyProduct";
import LoadingSkeleton from "@/app/(account)/products/LoadingSkeleton";
import ProductCard from "@/app/(account)/products/ProductCard";
import { Product } from "@/@types";
import { useState } from "react";
import { useFetchProducts } from "@/hooks/useProducts";

export default function AppProductListings() {
   const { isLoading, isError, data, error } = useFetchProducts();
   const hasProducts = data?.data.length && data?.data.length > 0;
   const [open, setOpen] = useState<boolean>(false);
   
   return (
      <>
         {isLoading && <LoadingSkeleton />}

         {!isLoading && !hasProducts && <EmptyProduct setOpen={setOpen}/>}

         {!isLoading && hasProducts && (
            <>
               <div className="mt-6 grid grid-cols-5 gap-3">
                  {data?.data.map((product: Product) => (
                     <ProductCard key={product._id} product={product}/>
                  ))}
               </div>
            </>
         )}
      </>
   );
}