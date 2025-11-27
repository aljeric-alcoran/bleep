import { z } from "zod"
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const productFormSchema = z.object({
   establishment_id: z.string(),
   category_id: z.string(),
   item_name: z.string().trim().min(1, "Product name is required."),
   description: z.string().min(1, "Description is required."),
   price: z.string("Price is required."),
   discount_price: z.string().optional(),
   stock: z.string("Stock is required."),
   isAvailable: z.boolean(),
   metadata: z.object({
      keywords: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
   })
});

export type ProductFormSchema = z.infer<typeof productFormSchema>;

export function useProductForm(): UseFormReturn<ProductFormSchema> {
   return useForm<ProductFormSchema>({
      resolver: zodResolver(productFormSchema),
      defaultValues: {
         item_name: "",
         description: "",
         price: "",
         discount_price: "",
         stock: "",
         isAvailable: true,
         metadata: {
            keywords: "",
            seoTitle: "",
            seoDescription: "",
         },
      }
   });
}