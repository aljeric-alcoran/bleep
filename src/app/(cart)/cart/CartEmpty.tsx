import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartEmpty() {
   return (
      <div className="w-full">
         <Empty className="bg-white rounded-sm">
            <EmptyHeader>
               <EmptyMedia variant="icon">
                  <ShoppingCart />
               </EmptyMedia>
               <EmptyTitle>Shopping Cart Empty</EmptyTitle>
               <EmptyDescription>
                  You haven’t added any items on your cart yet.
               </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
               <Link href="/">
                  <Button className="font-normal rounded-xs" variant="default">
                     Go Shopping Now
                  </Button>
               </Link>
            </EmptyContent>
         </Empty>
      </div>
   );
}