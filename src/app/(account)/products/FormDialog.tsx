import ProductForm from "@/components/forms/ProductFormCopy";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Establishment, Product } from "@/@types";

export default function FormDialog({
   open,
   setOpen,
   setSelectedProduct,
   product
}: {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>;
   product?: Establishment;
}) {
   const headerText = product ? "Update" : "Add New";
   const descText = product ? "update the" : "create a";
   return (
      <>
         <Dialog 
            open={open} 
            onOpenChange={(isOpen) => {
               setOpen(isOpen);
               if (!isOpen) setTimeout(() => setSelectedProduct(undefined), 500);
            }}
         >
            <DialogContent className="max-h-[calc(100dvh-5rem)] overflow-scroll">
               <DialogHeader>
                  <DialogTitle>{ headerText } Product</DialogTitle>
                  <DialogDescription>
                     Fill in the details below to { descText } product.
                  </DialogDescription>
               </DialogHeader>
               <ProductForm />
            </DialogContent>
         </Dialog>
      </>
   )
}