import { Category } from "../types/category-type";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function fetchCategories() {
   const response = await fetch(`${baseURL}/categories`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include', 
   });

   const data = await response.json();
   return { status: response.status, message: data.message, data: data.data };
}

export async function addCategory(categoryObject: Category) {
   console.log(categoryObject);
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