import { Product } from "../models";

export async function fetchProducts() {
   const response = await fetch("/api/v1/products", {
      method: 'GET',
   });
   
   if (!response.ok) throw new Error("Failed to fetch products");
   return response.json();
}