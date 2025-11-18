import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { EllipsisVertical, Plus, Store, Warehouse } from "lucide-react";

export default function Establishments() {
   return (
      <> 
         <div className="flex items-center gap-2">
            <Store className="w-5"/>
            <h1 className="text-lg font-semibold">Establishments</h1>
         </div>

         <div className="mt-6">
            <Card className="w-full max-w-sm relative">
               <CardHeader>
                  <CardTitle>Bleep Store</CardTitle>
                  <Button variant="link" className="absolute top-2 right-2">
                     <EllipsisVertical />
                  </Button>
               </CardHeader>
               <CardContent className="-mt-2">
                  <CardDescription className="space-y-3">
                     <div>
                        <p className="text-gray-900 text-xs">Address</p>
                        Enter your email below to login to your account
                     </div>

                     <div>
                        <p className="text-gray-900 text-xs">Phone</p>
                        +63 9 163 518 635
                     </div>
                  </CardDescription>
               </CardContent>
            </Card>
         </div>

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
                  <Button className="font-normal" variant="default" size="sm">
                     <Plus />
                     Create Establishment
                  </Button>
               </EmptyContent>
            </Empty>
         </div>
      </>
   )
}