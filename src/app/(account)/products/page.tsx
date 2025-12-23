"use client"

import EmptyProduct from "./EmptyProduct";
import ProductCard from "./ProductCard";
import LoadingSkeleton from "./LoadingSkeleton";
import FormDialog from "./FormDialog";
import { Button } from "@/components/ui/button";
import { fetchProducts } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { Package, Plus } from "lucide-react";
import { useState } from "react";
import { Product } from "@/lib/models";
import Link from "next/link";

export default function Products() {
   const { isLoading, isError, data, error } = useQuery({ queryKey:  ["products"], queryFn: fetchProducts});
   const hasProducts = data?.data.length > 0;
   const [open, setOpen] = useState<boolean>(false);
   const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
   
   return (
      <>
         <div className="flex items-center gap-2">
            <Package className="w-5"/>
            <h1 className="text-lg font-semibold">Products</h1>
         </div>

         {isLoading && <LoadingSkeleton />}

         {!isLoading && !hasProducts && <EmptyProduct setOpen={setOpen}/>}

         {!isLoading && hasProducts && (
            <>
               <Link href="/products/create">
                  <Button type="button" size="sm" className="mt-6 rounded-sm">
                     <Plus />
                     Add Product
                  </Button>
               </Link>
               <div className="mt-6 flex flex-wrap gap-4">
                  {data?.data.map((product: Product) => (
                     <ProductCard key={product._id} product={product}/>
                  ))}
               </div>
            </>
         )}

         <FormDialog 
            open={open} 
            setOpen={setOpen} 
            setSelectedProduct={setSelectedProduct}
         />
      </>
   )
}