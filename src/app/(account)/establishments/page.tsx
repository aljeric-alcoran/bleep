'use client'

import EmptyList from "./EmptyList";
import LoadingSkeleton from "./LoadingSkeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchEstablishments } from "@/lib/api/establishment";
import { EllipsisVertical, Store } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FormDialog from "./FormDialog";

export default function Establishments() {
   const { 
      isLoading, 
      isError, 
      data, 
      error 
   } = useQuery({ queryKey: ['establishments'], queryFn: fetchEstablishments});
   const hasEstablishments = data?.data.length > 0;

   const [open, setOpen] = useState<boolean>(false);
   return (
      <> 
         <div className="flex items-center gap-2">
            <Store className="w-5"/>
            <h1 className="text-lg font-semibold">Establishments</h1>
         </div>
         {isLoading && <LoadingSkeleton />}

         {!isLoading && !hasEstablishments && <EmptyList openDialog={() => setOpen(true)} />}

         {!isLoading && hasEstablishments && (
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
         )}

         <FormDialog open={open} setOpen={setOpen}/>
      </>
   )
}