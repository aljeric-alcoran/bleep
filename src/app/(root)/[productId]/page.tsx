"use client"

import Image from "next/image";
import ProductStore from "./ProductStore";
import ProductImageSlider from "./ImageSlider";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchProduct } from "@/lib/api/products";
import { parseDecimalToLocalString, priceDiscountCaculator, productHasDiscount } from "@/lib/helpers";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { CounterPill } from "@/components/ui/counter-pill";
import { useState } from "react";
import ProductDetails from "./ProductDetails";

export default function ProductOverview() {
   let product;
   const [qty, setQty] = useState(1);
   const { productId } = useParams<{ productId: string }>();
   const { isLoading, isError, data: response, error } = useQuery({
      queryKey: [`product-${productId}`], 
      queryFn: () => fetchProduct(productId)
   });
   
   if (!isLoading) {
      product = response.data
   }
   return (
      <>
         {isLoading ? (
            <div>Loading...</div>
         ) : (
            <>
               <div className="w-full shadow rounded-sm bg-white">
                  <div className="flex">
                     <div className="w-[750px] p-5">
                        <Image 
                           src={"/default-product.jpg"}
                           loading="eager"
                           width={500}
                           height={500}
                           className="border w-full"
                           alt="Picture of the author"
                        />
                        <div className="flex items-center justify-between gap-2 mt-3">
                           <ProductImageSlider/>
                        </div>
                     </div>
                     <div className="w-full p-5 pr-8">
                        <h1 className="text-xl font-medium mb-4">{product.item_name}</h1>

                        <div className="flex items-center gap-5 text-red-600 bg-gray-50 p-4">
                              <div className="text-3xl font-medium flex items-center gap-1">
                                 <span className="font-bold text-base mt-1">₱</span>
                                 {!productHasDiscount(product.discount_price) ? (
                                    parseDecimalToLocalString(product.price)
                                 ) : (
                                    priceDiscountCaculator(product.price, product.discount_price)
                                 )}
                              </div>
                              {productHasDiscount(product.discount_price) && (
                                 <div className="flex items-center justify-center gap-2">
                                    <div className="line-through text-gray-500">₱ {parseDecimalToLocalString(product.price)}</div>
                                    <span className="bg-red-50 px-1 py-px text-sm font-medium ">-{product.discount_price["$numberDecimal"]}%</span>
                                 </div>
                              )}
                        </div>

                        <div className="flex gap-10 items-center text-sm text-gray-500 mt-8">
                           <span>In Stock</span>
                           <p className="text-gray-900 font-medium">{product.stock}</p>
                        </div>
                        
                        <div className="flex gap-10 items-center text-sm text-gray-500 mt-8">
                           <span>Quantity</span>
                           <CounterPill
                              value={qty}
                              onChange={setQty}
                              min={1}
                              max={product.stock}
                           />
                        </div>

                        <div className="flex space-x-4 mt-8">
                           <Button type="button" className="border-red-500 w-50 py-6 cursor-pointer" size="lg">Buy Now</Button>
                           <Button 
                              type="button" 
                              variant="outline" 
                              className="border-red-500 w-50 py-6 bg-red-50 text-red-600 flex items-center gap-2 cursor-pointer hover:text-red-600 hover:bg-white" 
                              size="lg"
                           >
                              <ShoppingCart/>
                              Add To Cart
                           </Button>
                        </div>
                     </div>

                  </div>
               </div>

               <ProductStore product={product}/>

               <ProductDetails product={product}/>
            </>
         )}
      </>
   );
}