import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api/products";

export const productKeys = {
   all: ["products"] as const
};

export const useFetchProducts = () => useQuery({
   queryKey: productKeys.all,
   queryFn: fetchProducts
});

// export const useAddFavorite = () => {
//    const queryClient = useQueryClient();
 
//    return useMutation({
//       mutationFn: (payload: AddFavoritePayload) => addFavorite(payload),
//       onSuccess: () => {
//          queryClient.invalidateQueries({ queryKey: bookKeys.favorites.all });
//          queryClient.invalidateQueries({ queryKey: bookKeys.popular() });
//       },
//    });
// };