"use client"

import ProductStore from "./ProductStore";
import SkeletonLoading from "./SkeletonLoading";
import ProductDescription from "./ProductDescription";
import ProductOverview from "./ProductOverview";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchProduct } from "@/lib/api/products";

export default function ProductPageOverview() {
   const { productId } = useParams<{ productId: string }>();
   const { isLoading, isError, data: response, error } = useQuery({
      queryKey: [`product-${productId}`], 
      queryFn: () => fetchProduct(productId)
   });

   return (
      <>
         {isLoading ? (
            <SkeletonLoading/>
         ) : (
            <>
               <ProductOverview product={response.data}/>

               <ProductStore product={response.data}/>

               <ProductDescription product={response.data}/>
            </>
         )}
      </>
   );
}