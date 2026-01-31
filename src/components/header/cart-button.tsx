"use client"

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { fetchCartItems } from "@/lib/api/cart";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";

export default function CartButton() {
   const { isLoading, data } = useQuery({ queryKey:  ["cart"], queryFn: fetchCartItems});
   let cartTotalItems = 0;

   if (!isLoading) cartTotalItems = data.cart.total_items;

   return (
      <div className="flex items-center gap-2">
         <div className="p-4 relative">
            <Link href="/cart">
               <ShoppingCart className="w-7 h-7 font-semibold" />
               {!!cartTotalItems && (
                  <Badge className="absolute top-0 right-0 bg-white text-red-800 font-semibold" variant="outline">{cartTotalItems}</Badge>
               )}
            </Link>
         </div>
      </div>
   );
}