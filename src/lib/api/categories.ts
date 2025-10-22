import { Category } from "../types/category-type";
import { AddCategoryResponse, CategoryResponse } from "../types/response-types";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchCategories(): Promise<CategoryResponse> {
   const res = await fetch("http://localhost:3002/api/v1/categories");
   if (!res.ok) throw new Error("Failed to fetch categories");
   return res.json();
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

export async function updateCategory(categoryId: string | undefined, categoryObject: Category): Promise<AddCategoryResponse> {
   const response = await fetch(`${baseURL}/categories/${categoryId}`, {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify(categoryObject),
   });

   const data = await response.json();
   return data;
}

export async function deleteCategory(categoryId: string | undefined,) {
   const response = await fetch(`${baseURL}/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include', 
   });

   const data = await response.json();
   return data;
}