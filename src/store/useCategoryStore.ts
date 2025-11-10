import { create } from "zustand";
import { Category } from "@/lib/models";

type Categories = {
   categories: Category[];
   setCategories: (categories: Category[]) => void;
   addCategoryFromStore: (category: Category) => void;
   updateCategoryFromStore: (updatedCategory: Category) => void;
   removeCategoryFromStore: (categoryId: string | undefined) => void;
}

export const useCategoryStore = create<Categories>((set) => ({
   categories: [],
   setCategories: (items) => set({ categories: items }),
   addCategoryFromStore: (category) => set((state) => ({
      categories: [...state.categories, category],
   })),
   updateCategoryFromStore: (updatedCategory) =>
      set((state) => ({
         categories: state.categories.map((category) =>
            category._id === updatedCategory._id ? updatedCategory : category
         ),
      })),
   removeCategoryFromStore: (categoryId) =>
      set((state) => ({
        categories: state.categories.filter((category) => category._id !== categoryId),
      })),
}));