'use client'

import EmptyList from "./EmptyList";
import LoadingSkeleton from "./LoadingSkeleton";
import { fetchEstablishments } from "@/lib/api/establishment";
import { Plus, Store } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import FormDialog from "./FormDialog";
import CardItem from "./CardItem";
import { Establishment } from "@/lib/models";
import { Button } from "@/components/ui/button";

export default function Establishments() {
   const { 
      isLoading, 
      isError, 
      data, 
      error 
   } = useQuery({ queryKey: ['establishments'], queryFn: fetchEstablishments});
   const hasEstablishments = data?.data.length > 0;
   const [open, setOpen] = useState<boolean>(false);
   const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | undefined>();

   return (
      <> 
         <div className="flex items-center gap-2">
            <Store className="w-5"/>
            <h1 className="text-lg font-semibold">Establishments</h1>
         </div>
         {isLoading && <LoadingSkeleton />}

         {!isLoading && !hasEstablishments && <EmptyList openDialog={() => setOpen(true)} />}

         {!isLoading && hasEstablishments && (
            <>
            <Button size="sm" className="mt-6" onClick={() => setOpen(true)}>
               <Plus/>
               Add Establishment
            </Button>
            <div className="mt-4 flex flex-wrap gap-4">
               {data?.data.map((establishment: Establishment) => (
                  <CardItem 
                     key={establishment._id} 
                     establishment={establishment}
                     openForm={($event) => {
                        setSelectedEstablishment($event);
                        setOpen(true);
                     }}
                  />
               ))}
            </div>
            </>
         )}

         <FormDialog 
            open={open} 
            setOpen={setOpen} 
            setSelectedEstablishment={setSelectedEstablishment}
            establishment={selectedEstablishment}
         />
      </>
   )
}