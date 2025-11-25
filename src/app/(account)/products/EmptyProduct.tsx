import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Package, Plus } from "lucide-react";

export default function EmptyProduct({ 
   setOpen
}: { 
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
   return (
      <div className="mt-6 w-full">
         <Empty className="border border-dashed bg-gray-50 rounded-sm">
            <EmptyHeader>
               <EmptyMedia variant="icon">
                  <Package />
               </EmptyMedia>
               <EmptyTitle>No products yet!</EmptyTitle>
               <EmptyDescription>
                  You haven’t added any products yet. Go ahead and add one to get started!
               </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
               <Button onClick={() => setOpen(true)} className="font-normal" variant="default" size="sm">
                  <Plus />
                  Add Product
               </Button>
            </EmptyContent>
         </Empty>
      </div>
   );
}