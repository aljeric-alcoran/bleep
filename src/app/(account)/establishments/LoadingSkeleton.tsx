'use client'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus } from "lucide-react";

export default function LoadingSkeleton() {
   return (
      <>
         <Button size="sm" className="mt-6 rounded-sm" disabled>
            <Plus/>
            Add Establishment
         </Button>
         <div className="mt-4 flex flex-wrap gap-4">
            {Array.from({ length: 2 }).map((_, i) => (
               <Card key={i} className="w-full max-w-sm relative rounded-sm">
                  <CardHeader>
                     <CardTitle>
                        <Skeleton className="h-[20px] w-50" />
                     </CardTitle>
                  </CardHeader>
                  <CardContent className="-mt-2">
                     <CardDescription className="space-y-3">
                        <div className="space-y-2">
                           <Skeleton className="h-[12px] w-20" />
                           <Skeleton className="h-[16px]" />
                        </div>

                        <div className="space-y-2">
                           <Skeleton className="h-[12px] w-20" />
                           <Skeleton className="h-[16px]" />
                        </div>
                     </CardDescription>
                  </CardContent>
               </Card>
            ))}
         </div>
      </>
   );
}