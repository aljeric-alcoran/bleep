import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { Ban } from "lucide-react";

export default function AppForbidden({ 
   message
}: { 
   message: string | undefined;
}) {
   return (
      <div className="mt-6">
         <Empty className="border border-dashed bg-gray-50 rounded-sm">
            <EmptyHeader>
               <EmptyMedia variant="icon">
                  <Ban color="red"/>
               </EmptyMedia>
               <EmptyTitle>Access Denied!</EmptyTitle>
               <EmptyDescription>
                  {message || "Forbidden: You have no access to this page."}
               </EmptyDescription>
            </EmptyHeader>
         </Empty>
      </div>
   );
}