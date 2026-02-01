"use client"

import { type CartItem } from "@/@types";
import { Button } from "@/components/ui/button";
import { CounterPill } from "@/components/ui/counter-pill";
import { parseDecimalToLocalString } from "@/lib/helpers";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function CartItem({
   cartItem
} : {
   cartItem: CartItem;
}) {
   const [qty, setQty] = useState<number>(cartItem.quantity);
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
                     onChange={setQty}
                     min={1}
                     max={cartItem.product.stock}
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