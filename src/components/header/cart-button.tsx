"use client"

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { fetchCart } from "@/lib/api/cart";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore";

export default function CartButton() {
   const user = useUserStore((state) => state.user);
   
   const { data, isLoading } = useQuery({ 
      queryKey: ["cart"], 
      queryFn: fetchCart,
      select: (data) => data?.cart?.total_items ?? 0,
      retry: false,
   });

   return (
      <div className="flex items-center gap-2">
         <div className="p-4 relative">
            <Link href="/cart">
               <ShoppingCart className="w-7 h-7 font-semibold" />
               {user && !isLoading && !!data && (
                  <Badge className="absolute top-0 right-0 bg-white text-red-800 font-semibold" variant="outline">{data}</Badge>
               )}
            </Link>
         </div>
      </div>
   );
}