import { z } from "zod"
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/lib/models";

export const userFormSchema = z.object({
   firstname: z.string().trim().min(1, "First name cannot be empty."),
   lastname: z.string().trim().min(1, "Last name cannot be empty."),
   birthday: z.date().optional(),
   gender: z.enum(['male', 'female', 'other']).nullable().optional()
});

export type UserFormSchema = z.infer<typeof userFormSchema>;

export function useUserFormSchema(userInfo: User | null): UseFormReturn<UserFormSchema> {
   return useForm<UserFormSchema>({
      resolver: zodResolver(userFormSchema),
      defaultValues: {
         firstname: userInfo?.firstname ?? "",
         lastname: userInfo?.lastname ?? "",
         birthday: userInfo?.birthday ? new Date(userInfo.birthday) : undefined,
         gender: userInfo?.gender ?? null
      },
   });
}

