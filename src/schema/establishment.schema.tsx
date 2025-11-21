import { z } from "zod"
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const establishmentFormSchema = z.object({
   name: z.string().trim().min(1, "Name is required."),
   address: z.string().min(1, "Address is required."),
   phone: z.string().min(10, "Must have 10-digit"),
});

export type EstablishmentFormSchema = z.infer<typeof establishmentFormSchema>;

export function useEstablishmentForm(): UseFormReturn<EstablishmentFormSchema> {
   return useForm<EstablishmentFormSchema>({
      resolver: zodResolver(establishmentFormSchema),
      defaultValues: {
         name: "",
         address: "",
         phone: "",
      },
   });
}