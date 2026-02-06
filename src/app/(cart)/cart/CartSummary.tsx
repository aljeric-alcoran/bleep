import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function CartSummary() {
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
               <div>Total</div>
               <Button className="rounded-xs w-42 py-5 font-normal">
                  Check Out
               </Button>
            </div>
         </div>
      </div>
   );
}