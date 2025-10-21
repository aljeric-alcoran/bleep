import { z } from "zod"
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@/lib/types/user-type";

export const userFormSchema = z.object({
   firstname: z.string().trim().min(1, "First name cannot be empty."),
   lastname: z.string().trim().min(1, "Last name cannot be empty."),
   birthday: z.date(),
   gender: z.enum(['male', 'female', 'other']).nullable()
});

export type UserFormSchema = z.infer<typeof userFormSchema>;

export function useUserForm(userInfo: User | null): UseFormReturn<UserFormSchema> {
   return useForm<UserFormSchema>({
      resolver: zodResolver(userFormSchema),
      defaultValues: {
         firstname: userInfo?.firstname ?? "",
         lastname: userInfo?.lastname ?? "",
         birthday: undefined,
         gender: null
      },
   });
}

