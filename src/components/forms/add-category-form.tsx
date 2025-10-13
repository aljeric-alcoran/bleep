import { Button } from "@/components/ui/button"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function AddCategoryForm() {
   return (
      <Dialog>
         <form>
            <DialogTrigger asChild>
               <Button>Add Category</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
               <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                  <DialogDescription>
                     Fill in the details below to create a new category.
                  </DialogDescription>
               </DialogHeader>
               <div className="grid gap-4">
                  <div className="grid gap-3">
                     <Label htmlFor="name-1">Name</Label>
                     <Input id="name-1" name="name" />
                  </div>
                  <div className="grid gap-3">
                     <Label htmlFor="username-1">Username</Label>
                     <Input id="username-1" name="username" />
                  </div>
               </div>
               <DialogFooter>
                  <DialogClose asChild>
                     <Button variant="outline">Discard</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
               </DialogFooter>
            </DialogContent>
         </form>
      </Dialog>
   )
}