"use client"

import { Button } from "@/components/ui/button";
import EmptyProduct from "./EmptyProduct";
import ProductCard from "./ProductCard";
import { Package, Plus } from "lucide-react";
import { useState } from "react";

export default function Products() {
   const [open, setOpen] = useState<boolean>(false);
   return (
      <>
         <div className="flex items-center gap-2">
            <Package className="w-5"/>
            <h1 className="text-lg font-semibold">Products</h1>
         </div>

         <>
            <Button size="sm" className="mt-6 rounded-sm" onClick={() => setOpen(true)}>
               <Plus />
               Add Product
            </Button>
            <div className="mt-4 flex flex-wrap gap-2">
               <ProductCard />
               <ProductCard />
               <ProductCard />
               <ProductCard />
            </div>
         </>
         <EmptyProduct setOpen={setOpen}/>
      </>
   )
}