import { Category } from "../models";
import { CategoryResponse, CategoriesResponse } from "../models";

export async function fetchCategories(): Promise<CategoriesResponse> {
   const response = await fetch("/api/v1/categories", {
      method: 'GET',
   });
   if (!response.ok) throw new Error("Failed to fetch categories");
   return response.json();
}

export async function addNewCategory(categoryObject: Category): Promise<CategoryResponse> {
   const response = await fetch("/api/v1/categories", {
      method: 'POST',
      body: JSON.stringify(categoryObject),
   });

   if (!response.ok) throw new Error("Failed to add a category!");
   return response.json();
}

export async function updateCategory(categoryObject: Category): Promise<CategoryResponse> {
   const response = await fetch(`/api/v1/categories/${categoryObject._id}`, {
      method: 'PUT', 
      body: JSON.stringify(categoryObject),
   });

   if (!response.ok) throw new Error("Failed to update the category!");
   return response.json();
}

export async function deleteCategory(categoryId: string) {
   const response = await fetch(`/api/v1/categories/${categoryId}`, {
      method: 'DELETE' 
   });

   const data = await response.json();
   return data;
}