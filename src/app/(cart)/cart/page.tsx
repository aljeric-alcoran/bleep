"use client"

import CartHeader from "./CartHeaders";
import CartItem from "./CartItem";
import CartEmpty from "./CartEmpty";
import CartSummary from "./CartSummary";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "@/lib/api/cart";
import { CartResponse } from "@/@types";
import { useEffect, useState } from "react";

export default function ShoppingCart() {
   const { isLoading, data, isError } = useQuery<CartResponse>({ 
      queryKey:  ["cart"], 
      queryFn: fetchCart,
      retry: 2,
   });
   const hasItems = (data?.items?.length ?? 0) > 0;
   
   const [allSelected, setAllSelected] = useState<boolean>(false);

   useEffect(() => {
      if (!isLoading && data) {
         setAllSelected(data.all_items_selected);
      }
   }, [isLoading, data]);

   return (
      <>
         {isLoading && <div>Loading...</div>}

         {!isLoading && !hasItems && <CartEmpty/>}

         {!isLoading && hasItems && (
            <>
               <CartHeader/>

               <div className="mt-4 shadow w-full rounded-sm overflow-hidden">
                  {data?.items.map((item) => (
                     <CartItem 
                        key={item.id} 
                        cartItem={item} 
                        allSelected={allSelected}
                     />
                  ))}
               </div>
               
               <CartSummary 
                  cart={data} 
                  allSelected={allSelected} 
                  setAllSelected={setAllSelected}
               />
            </>
         )}
      </>
   );
}