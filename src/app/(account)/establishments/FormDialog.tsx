import EstablishmentForm from "@/components/forms/EstablishmentForm";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Establishment } from "@/@types";

export default function FormDialog({
   open,
   setOpen,
   setSelectedEstablishment,
   establishment
}: {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setSelectedEstablishment: React.Dispatch<React.SetStateAction<Establishment | undefined>>;
   establishment?: Establishment;
}) {
   const headerText = establishment ? "Update" : "Add New";
   const descText = establishment ? "update the" : "create an";
   return (
      <>
         <Dialog 
            open={open} 
            onOpenChange={(isOpen) => {
               setOpen(isOpen);
               if (!isOpen) setTimeout(() => setSelectedEstablishment(undefined), 500);
            }}
         >
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>{ headerText } Establishment</DialogTitle>
                  <DialogDescription>
                     Fill in the details below to { descText } establishment.
                  </DialogDescription>
               </DialogHeader>
               <EstablishmentForm 
                  setOpen={setOpen} 
                  establishment={establishment}
               />
            </DialogContent>
         </Dialog>
      </>
   )
}