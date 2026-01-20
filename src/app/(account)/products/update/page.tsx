"use client"

import ProductForm from "@/components/forms/ProductFormCopy";
import { fetchProduct } from "@/lib/api/products";
import { useQuery } from "@tanstack/react-query";
import { Package } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function CreateProduct() {
   const searchParams = useSearchParams();
   const productId = searchParams.get("productId");
  
   const { isLoading, data } = useQuery({ 
      queryKey: [`product-${productId}`], 
      queryFn: () => fetchProduct(productId!) 
   });

   console.log(data?.data);
   return (
      <>
         <div className="flex items-start gap-2">
            <Package className="w-5 mt-0.5"/>
            <div>
               <h1 className="text-lg font-semibold">Update Product</h1>
               <p className="text-sm">Fill in the details below to update the product details.</p>
            </div>
         </div>

         <div className="ml-7 mt-10 w-full max-w-[600px]">
            <ProductForm product={data?.data}/>
         </div>
      </>
   )
}