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
               <Button size="sm" className="mt-6 rounded-sm" onClick={() => setOpen(true)}>
                  <Plus />
                  Add Product
               </Button>
               <div className="mt-4 flex flex-wrap gap-4 md:gap-6 lg:gap-8">
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
                  <ProductCard />
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