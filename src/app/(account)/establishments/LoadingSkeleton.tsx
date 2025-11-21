'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingSkeleton() {
   return (
      <div className="mt-6">
         <Card className="w-full max-w-sm relative">
            <CardHeader>
               <CardTitle>
                  <Skeleton className="h-[20px] w-50" />
               </CardTitle>
            </CardHeader>
            <CardContent className="-mt-2">
               <CardDescription className="space-y-3">
                  <div className="space-y-2">
                     <Skeleton className="h-[12px] w-35" />
                     <Skeleton className="h-[16px]" />
                  </div>

                  <div className="space-y-2">
                     <Skeleton className="h-[12px] w-35" />
                     <Skeleton className="h-[16px]" />
                  </div>
               </CardDescription>
            </CardContent>
         </Card>
      </div>
   );
}