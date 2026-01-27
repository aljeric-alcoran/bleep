import { Product } from "@/@types";

export async function fetchProducts() {
   const response = await fetch("/api/v1/products", {
      method: 'GET',
   });
   
   if (!response.ok) throw new Error("Failed to fetch products");
   return response.json();
}

export async function fetchSellerProducts() {
   const response = await fetch("/api/v1/products/seller", {
      method: 'GET',
   });
   
   if (!response.ok) throw new Error("Failed to fetch your products");
   return response.json();
}

export async function createProduct(productObject: Product) {
   console.log(productObject);
   const response = await fetch("/api/v1/products", {
      method: 'POST',
      body: JSON.stringify(productObject),
   });

   if (!response.ok) throw new Error("Failed to add a product!");
   return response.json();
}

export async function fetchProduct(productId: string) {
   const response = await fetch(`/api/v1/products/${productId}`, {
      method: 'GET',
   });
   
   if (!response.ok) throw new Error(`Failed to fetch product: ${productId}`);
   return response.json();
}