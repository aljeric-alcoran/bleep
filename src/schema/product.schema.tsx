import { z } from "zod"
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const productFormSchema = z.object({
   establishment_id: z.string(),
   item_name: z.string().trim().min(1, "Product name is required."),
   description: z.string().min(1, "Description is required."),
   price: z.number("Price is required."),
   discount_price: z.number().optional(),
   stock: z.number(),
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
         price: 0.00,
         discount_price: 0.00,
         stock: 0,
         isAvailable: true,
         metadata: {
            keywords: "",
            seoTitle: "",
            seoDescription: "",
         },
      }
   });
}