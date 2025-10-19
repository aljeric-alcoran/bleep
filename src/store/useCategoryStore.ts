import { create } from "zustand";
import { Category } from "@/lib/types/category-type";
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

type Categories = {
   categories: Category[];
   setCategories: (categories: Category[]) => void;
}

export const useCategoryStore = create<Categories>((set) => ({
   categories: [],
   setCategories: (items) => set({ categories: items })
}));