import { api } from "./client";
import type { UpdateCartItemPayload, BulkItemPayload } from "@/@types/cart";

export async function fetchCart() {
  return api.get("/api/v1/cart");
}

export async function addItemToCart(item: {
  productId: string;
  quantity: number;
}) {
  return api.post("/api/v1/cart/add", item);
}

export async function updateCartItemQuantity(item: UpdateCartItemPayload) {
  return api.put(`/api/v1/cart/item/${item.productId}`, item);
}

export async function updateBulkCartItemSelected(payload: BulkItemPayload) {
  return api.patch("/api/v1/cart/items/selected", payload);
}

export async function deleteCartItem(productId: string) {
  return api.delete(`/api/v1/cart/item/${productId}`);
}