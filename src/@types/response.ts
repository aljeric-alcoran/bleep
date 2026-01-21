import { Category } from "./category";

export interface CategoriesResponse {
   status: string;
   code: number;
   message: string;
   data: Category[]
}

export interface CategoryResponse {
   status: string;
   code: number;
   message: string;
   data: Category
}