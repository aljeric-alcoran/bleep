"use client"
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";
import { useCategoryStore } from '@/store/useCategoryStore';
import { useEffect, useState } from "react";
import { CategoryForm } from "@/components/forms/category-form";
import { CategoryFormSchema, useCategoryForm } from "@/schema/category.schema";
import { Category } from "@/lib/types/category-type";
import { updateCategory } from "@/lib/api/categories";
import { toast } from "sonner"

export function UpdateCategory({ 
   open, setOpen, category 
} : {
   open: boolean;
   setOpen: (open: boolean) => void;
   category: Category
}) {
   const updateCategoryFromStore = useCategoryStore((state) => state.updateCategoryFromStore);
   const [error, setError] = useState<string | null>(null);
   const form = useCategoryForm();

   useEffect(() => {
      if (open && category) {
         form.reset({
            name: category.name ?? "",
            description: category.description ?? "",
            parent: category.parent ?? "",
            isActive: category.isActive ?? true,
            order: category.order ?? 0,
            metadata: {
               keywords: category.metadata?.keywords?.join(" ") ?? "",
               seoTitle: category.metadata?.seoTitle ?? "",
               seoDescription: category.metadata?.seoDescription ?? "",
            },
         });
      }
    }, [open, category, form]);

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
         const response = await updateCategory(category._id, payload);
         updateCategoryFromStore(response.data);
         toast.success("Success!", { 
            description: `Category ${category.name} has been updated!` 
         })
         setOpen(false)
      } catch(error: any) {
         setError(error.message)
         console.log(error);
      }
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Update Category</DialogTitle>
               <DialogDescription>
                  Modify the details of an existing category.
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