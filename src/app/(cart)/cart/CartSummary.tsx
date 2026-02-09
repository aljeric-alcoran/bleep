import { CartResponse } from "@/@types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { parseDecimalToLocalString } from "@/lib/helpers";

export default function CartSummary({
   cart
}: {
   cart?: CartResponse;
}) {
   return (
      <div className="w-full shadow rounded-sm bg-white p-5 px-8 text-sm font-medium text-gray-800 mt-4">
         <div className="grid grid-cols-2 items-center gap-4">
            <div>
               <FieldGroup className="w-56">
                  <Field orientation="horizontal">
                     <Checkbox id="select-all-checkbox" name="select-all-checkbox" />
                     <FieldLabel htmlFor="select-all-checkbox" className="font-normal">
                        Select All ({cart?.items.length})
                     </FieldLabel>
                  </Field>
               </FieldGroup>
            </div>
            <div className="grid grid-cols-2 items-center justify-items-end gap-4">
               <div className="flex flex-col items-end gap-3">
                  <div className="flex gap-4 items-center font-normal">
                     Total ({cart?.total_selected_items} {cart?.total_selected_items! > 1 ? 'items' : 'item'}):
                     <div className="flex items-center font-medium text-xl text-primary gap-1">
                        <span className="font-bold text-sm">₱</span>
                        {parseDecimalToLocalString(cart?.grand_total)}
                     </div>
                  </div>
                  {cart?.total_discount! > 0 && (
                     <div className="flex gap-4 items-center text-sm font-normal">
                        Saved
                        <div className="flex items-center text-primary gap-1">
                           <span className="font-medium">₱</span>
                           {parseDecimalToLocalString(cart?.total_discount)}
                        </div>
                     </div>
                  )}
               </div>
               <Button className="rounded-xs w-42 py-5 font-normal">
                  Check Out
               </Button>
            </div>
         </div>
      </div>
   );
}