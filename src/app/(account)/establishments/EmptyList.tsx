import { Button } from "@/components/ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Plus, Warehouse } from "lucide-react";

export default function EmptyList({ 
   openDialog
}: { 
   openDialog: () => void;
}) {
   return (
      <div className="mt-6">
         <Empty className="border border-dashed">
            <EmptyHeader>
               <EmptyMedia variant="icon">
                  <Warehouse />
               </EmptyMedia>
               <EmptyTitle>No Establishment Yet</EmptyTitle>
               <EmptyDescription>
                  Ready to start selling? Create your first establishment and showcase your products.
               </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
               <Button onClick={openDialog} className="font-normal" variant="default" size="sm">
                  <Plus />
                  Create Establishment
               </Button>
            </EmptyContent>
         </Empty>
      </div>
   );
}