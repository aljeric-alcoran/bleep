import type { Product, ProductResponse } from "@/@types/product";
import { api } from "./client";

export async function fetchProducts() {
  return api.get<ProductResponse>("/api/v1/products");
}

export async function fetchSellerProducts() {
  return api.get<ProductResponse>("/api/v1/products/seller");
}

export async function createProduct(productObject: Product) {
  return api.post("/api/v1/products", productObject);
}

export async function fetchProduct(productId: string) {
  return api.get(`/api/v1/products/${productId}`);
}
