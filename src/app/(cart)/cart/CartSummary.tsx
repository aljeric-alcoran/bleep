import { Cart } from "@/@types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { parseDecimalToLocalString } from "@/lib/helpers";

export default function CartSummary({
   cart
}: {
   cart?: Cart;
}) {
   return (
      <div className="w-full shadow rounded-sm bg-white p-5 px-8 text-sm font-medium text-gray-800 mt-4">
         <div className="grid grid-cols-2 items-center gap-4">
            <div>
               <FieldGroup className="w-56">
                  <Field orientation="horizontal">
                     <Checkbox id="select-all-checkbox" name="select-all-checkbox" />
                     <FieldLabel htmlFor="select-all-checkbox" className="font-normal">
                        Select All
                     </FieldLabel>
                  </Field>
               </FieldGroup>
            </div>
            <div className="grid grid-cols-2 items-center justify-items-end gap-4">
               <div className="flex gap-4 items-center">
                  Total:
                  <span className="font-medium text-xl text-primary">₱{parseDecimalToLocalString(cart?.total_price)}</span>
               </div>
               <Button className="rounded-xs w-42 py-5 font-normal">
                  Check Out
               </Button>
            </div>
         </div>
      </div>
   );
}