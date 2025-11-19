import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function FormDialog({
   open,
   setOpen
}: {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
   return (
      <>
         <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Add New Establishment</DialogTitle>
                  <DialogDescription>
                     Fill in the details below to create an establishment.
                  </DialogDescription>
               </DialogHeader>
               
            </DialogContent>
         </Dialog>
      </>
   )
}