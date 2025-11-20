import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Establishment } from "@/lib/models";
import { EllipsisVertical } from "lucide-react";
import FormDialog from "./FormDialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function CardItem({
   openForm,
   establishment
}: {
   openForm: (value: Establishment) => void;
   establishment: Establishment;
}) {
   return (
      <>
         <Card className="w-full max-w-sm relative rounded-sm">
            <CardHeader>
               <CardTitle>{establishment?.name}</CardTitle>

               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="link" className="absolute top-2 right-2">
                        <EllipsisVertical />
                     </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
                     <DropdownMenuItem onClick={() => openForm(establishment)}>
                        Edit
                     </DropdownMenuItem>
                     <DropdownMenuItem>
                        Delete
                     </DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>

            </CardHeader>
            <CardContent className="-mt-2">
               <CardDescription className="space-y-3">
                  <div>
                     <p className="text-gray-900 text-xs">Address</p>
                     {establishment?.address}
                  </div>

                  <div>
                     <p className="text-gray-900 text-xs">Phone</p>
                     {establishment?.phone}
                  </div>
               </CardDescription>
            </CardContent>
         </Card>
      </>
   )
}