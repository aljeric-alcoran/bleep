"use client"
import { z } from "zod"
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { useCategoryStore } from '@/store/useCategoryStore';
import { useState } from "react";
import { Category } from "@/lib/models";
import { deleteCategory } from "@/lib/api/categories";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CircleX } from "lucide-react";

export const categorySchema = z.object({
   name: z.string().trim().min(1, "Input should no be empty."),
});

export function DeleteCategory({ 
   open, setOpen, category 
} : {
   open: boolean;
   setOpen: (open: boolean) => void;
   category: Category
}) {
   const form = useForm<z.infer<typeof categorySchema>>({
      resolver: zodResolver(categorySchema),
      defaultValues: { name: "" },
   });
   const removeCategoryFromStore = useCategoryStore((state) => state.removeCategoryFromStore);
   const [error, setError] = useState<string | null>(null);

   async function onSubmit(values: z.infer<typeof categorySchema>) {
      if (values.name !== category.name) {
         setError("Incorrect text was entered.")
      } else {
         try {
            await deleteCategory(category._id!);
            removeCategoryFromStore(category._id);
            toast.success("Success!", { 
               description: `Category ${category.name} has been deleted!` 
            })
            form.reset();
            setOpen(false)
         } catch(error: any) {
            setError(error.message)
            console.log(error);
         }
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Delete Category</DialogTitle>
               <DialogDescription>
                  Are you sure you want to delete category {category.name}?.
               </DialogDescription>
            </DialogHeader>
            {error ? (
               <Alert className="bg-red-50 text-red-700">
                  <CircleX />
                  <AlertTitle className="text-xs mt-0.5 -ml-1">{error}</AlertTitle>
               </Alert>
            ) : null}
            <Form {...form}>
               <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <p className="text-sm">Type <span className="font-semibold">'{category.name}'</span> to confirm</p>
                           <FormControl>
                              <Input {...field} onChange={(e) => {
                                 field.onChange(e);
                                 setError(null)
                              }} />
                           </FormControl>
                           <FormMessage className="text-xs"/>
                        </FormItem>
                     )}
                  />
                  <DialogFooter className="mt-6">
                     <DialogClose asChild>
                        <Button variant="outline">Discard</Button>
                     </DialogClose>
                     <Button type="submit">Delete</Button>
                  </DialogFooter>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   )
}