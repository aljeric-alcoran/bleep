import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Establishment } from "@/lib/models";
import { EllipsisVertical } from "lucide-react";

export default function CardItem({establishment}: {establishment: Establishment}) {
   return (
      <Card className="w-full max-w-sm relative rounded-sm">
         <CardHeader>
            <CardTitle>{establishment?.name}</CardTitle>
            <Button variant="link" className="absolute top-2 right-2">
               <EllipsisVertical />
            </Button>
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
   )
}