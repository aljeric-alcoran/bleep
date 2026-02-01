"use client"

import CartHeader from "./CartHeaders";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "@/lib/api/cart";
import { CartResponse } from "@/@types";
import CartItem from "./CartItem";

export default function ShoppingCart() {
   const { isLoading, data, isError } = useQuery<CartResponse>({ 
      queryKey:  ["cart"], 
      queryFn: fetchCart,
      retry: 2,
   });

   return (
      <>
         <CartHeader/>

         {isLoading ? (
            <div>Loading...</div>
         ) : (
            <div className="mt-4 shadow w-full rounded-sm overflow-hidden">
               {data?.items.map((item) => (
                  <CartItem key={item.id} cartItem={item} />
               ))}
            </div>
         )}
      </>
   );
}