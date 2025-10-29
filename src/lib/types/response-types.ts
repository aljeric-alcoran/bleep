import { Category } from "./category-type";

export type CategoriesResponse = {
   status: string;
   code: number;
   message: string;
   data: Category[]
}

export type CategoryResponse = {
   status: string;
   code: number;
   message: string;
   data: Category
}