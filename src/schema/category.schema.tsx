import { z } from "zod"
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const categoryFormSchema = z.object({
   name: z.string().trim().min(1, "Name cannot be empty"),
   description: z.string().optional(),
   parent: z.string().optional(),
   isActive: z.boolean(),
   order: z.number(),
   metadata: z.object({
      keywords: z.string().optional(),
      seoTitle: z.string().optional(),
      seoDescription: z.string().optional(),
   })
});

export type CategoryFormSchema = z.infer<typeof categoryFormSchema>;

export function useCategoryForm(): UseFormReturn<CategoryFormSchema> {
   return useForm<CategoryFormSchema>({
      resolver: zodResolver(categoryFormSchema),
      defaultValues: {
         name: "",
         description: "",
         parent: "",
         isActive: true,
         order: 0,
         metadata: {
            keywords: "",
            seoTitle: "",
            seoDescription: "",
         },
      },
   });
}

