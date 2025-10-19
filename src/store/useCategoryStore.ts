import { create } from "zustand";
import { Category } from "@/lib/types/category-type";

type Categories = {
   categories: Category[];
   setCategories: (categories: Category[]) => void;
   addToCategoryStore: (category: Category) => void;
}

export const useCategoryStore = create<Categories>((set) => ({
   categories: [],
   setCategories: (items) => set({ categories: items }),
   addToCategoryStore: (category) => set((state) => ({
      categories: [...state.categories, category],
   })),
}));