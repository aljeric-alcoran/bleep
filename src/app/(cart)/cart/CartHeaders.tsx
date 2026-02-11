import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";

export default function CartHeader() {
   return (
      <div className="w-full shadow rounded-sm bg-white p-5 px-8 text-sm font-medium text-gray-800">
         <div className="grid grid-cols-2 items-center gap-4">
            <div className="flex items-center gap-7">
               <div>
                  <FieldGroup>
                     <Field orientation="horizontal">
                        <Checkbox id="select-all-checkbox" name="select-all-checkbox" />
                     </Field>
                  </FieldGroup>
               </div>
               <p>Product</p>
            </div>
            <div className="grid grid-cols-4 justify-items-center gap-4">
               <p>Unit Price</p>
               <p>Quantity</p>
               <p>Total Price</p>
               <p>Actions</p>
            </div>
         </div>
      </div>
   );
}