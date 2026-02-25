import ProductForm from "@/components/forms/ProductForm";
import { Package } from "lucide-react";

export default function CreateProduct() {
   return (
      <>
         <div className="flex items-start gap-2">
            <Package className="w-5 mt-0.5"/>
            <div>
               <h1 className="text-lg font-semibold">Create a New Product</h1>
               <p className="text-sm">Create or add a product by filling out the form or scanning its barcode.</p>
            </div>
         </div>

         <div className="ml-7 mt-10 w-full max-w-[600px]">
            <ProductForm />
         </div>
      </>
   )
}