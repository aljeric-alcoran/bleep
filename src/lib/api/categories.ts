import { Category } from "../types/category-type";
import { AddCategoryResponse, CategoryResponse } from "../types/response-types";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchCategories(): Promise<CategoryResponse> {
   const response = await fetch(`${baseURL}/categories`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include', 
   });

   const data = await response.json();
   return data;
}

export async function addNewCategory(categoryObject: Category): Promise<AddCategoryResponse> {
   const response = await fetch(`${baseURL}/categories`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify(categoryObject),
   });

   const data = await response.json();
   return data;
}