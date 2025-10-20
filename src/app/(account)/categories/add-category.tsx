"use client"
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { addNewCategory } from "@/lib/api/categories";
import { useCategoryStore } from '@/store/useCategoryStore';
import { useState } from "react";
import { CategoryForm } from "@/components/forms/category-form";
import { CategoryFormSchema, useCategoryForm } from "@/schema/category.schema";
import { toast } from "sonner";

export function AddCategory() {
   const addCategoryFromStore = useCategoryStore((state) => state.addCategoryFromStore);
   const [open, setOpen] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const form = useCategoryForm();

   async function onSubmit(values: CategoryFormSchema): Promise<void> {
      try {
         const { metadata, parent, ...data } = values;
         const payload = {
            ...data,
            parent: parent === '' ? null : parent,
            metadata: {
               keywords: metadata?.keywords?.split(" "),
               seoTitle: metadata.seoTitle,
               seoDescription: metadata.seoDescription
            }
         }
         const response = await addNewCategory(payload);
         addCategoryFromStore(response.data);
         toast.success("Success!", { 
            description: `Category ${payload.name} has been created!` 
         })
         form.reset();
         setOpen(false);
      } catch(error: any) {
         setError(error.message)
         console.log(error);
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
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
            <CategoryForm 
               form={form} 
               error={error} 
               onSubmit={onSubmit}
            />
         </DialogContent>
      </Dialog>
   )
}