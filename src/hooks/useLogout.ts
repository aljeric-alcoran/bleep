import { logoutUser } from "@/lib/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLogout() {
   const queryClient = useQueryClient();

   const logoutMutation = useMutation({
      mutationFn: logoutUser,
      onSuccess: () => {
         queryClient.removeQueries({ queryKey: ["user-auth"] });
         queryClient.removeQueries({ queryKey: ["cart"] });
      },
   });
   
   return logoutMutation;
}