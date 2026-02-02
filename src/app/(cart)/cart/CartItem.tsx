"use client"

import { type CartItem } from "@/@types";
import { Button } from "@/components/ui/button";
import { CounterPill } from "@/components/ui/counter-pill";
import { updateCartItemQuantity } from "@/lib/api/cart";
import { parseDecimalToLocalString } from "@/lib/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useRef, useState } from "react";

export default function CartItem({
   cartItem
} : {
   cartItem: CartItem;
}) {
   const queryClient = useQueryClient();
   const debounceRef = useRef<NodeJS.Timeout | null>(null);
   const [qty, setQty] = useState<number>(cartItem.quantity);
   const [isQtyUpdating, setIsQtyUpdating] = useState<boolean>(false);

   const updateQuantity = useMutation({
      mutationFn: updateCartItemQuantity,
      onMutate: async (payload) => {
         await queryClient.cancelQueries({ queryKey: ["cart"] });
         const previousCart = queryClient.getQueryData(["cart"]);
         queryClient.setQueryData(["cart"], (old: any) => old);
     
         return { previousCart };
      },
      onError: (_err, _vars, context) => {
         queryClient.setQueryData(["cart"], context?.previousCart);
         setIsQtyUpdating(false);
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ["cart"] });
         setIsQtyUpdating(false);
      },
   });

   const handleQuantityChange = (newValue: number) => {
      setQty(newValue);
      setIsQtyUpdating(true);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
         updateQuantity.mutate({
            productId: cartItem.id,
            quantity: newValue,
         });
      }, 500)
   };

   return (
      <div className="w-full bg-white p-5 px-8 text-sm border-b">
         <div className="grid grid-cols-2 items-center gap-4">
            <div>
               <p>{cartItem.product.item_name}</p>
            </div>
            <div className="grid grid-cols-4 justify-items-center gap-4">
               <p className="place-self-center">₱{parseDecimalToLocalString(cartItem.price_at_time)}</p>
               <div className="place-self-center">
                  <CounterPill
                     value={qty}
                     min={1}
                     max={cartItem.product.stock}
                     isUpdating={isQtyUpdating}
                     onChange={handleQuantityChange}
                  />
               </div>
               <p className="place-self-center text-primary font-medium">₱{parseDecimalToLocalString(cartItem.subtotal)}</p>
               <div>
                  <Button size="sm">
                     <Trash2/>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}