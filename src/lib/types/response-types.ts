import { Category } from "./category-type";

export type CategoryResponse = {
   status: string;
   code: number;
   message: string;
   data: Category[]
}

export type AddCategoryResponse = {
   status: string;
   code: number;
   message: string;
   data: Category
}