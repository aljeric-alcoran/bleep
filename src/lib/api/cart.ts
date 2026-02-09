export async function fetchCart() {
   const response = await fetch("/api/v1/cart", {
      method: 'GET',
   });

   if (!response.ok) {
      const error = await response.json();
      throw {
         status: response.status,
         message: error.message || error.error || "Request failed"
      };
   }

   return response.json();
}

export async function addItemToCart(item: { productId: string; quantity:  number; }) {
   const response = await fetch("/api/v1/cart/add", {
      method: 'POST',
      body: JSON.stringify(item),
   });

   if (!response.ok) {
      const error = await response.json();
      throw {
         status: response.status,
         message: error.message || error.error || "Request failed"
      };
   }

   return response.json();
}

type UpdateCartItemPayload = {
   productId: string;
   quantity?: number;
   selected?: boolean;
};
export async function updateCartItemQuantity(item: UpdateCartItemPayload) {
   const response = await fetch(`/api/v1/cart/item/${item.productId}`, {
      method: 'PUT', 
      body: JSON.stringify(item),
   });

   if (!response.ok) {
      const error = await response.json();
      throw {
         status: response.status,
         message: error.message || error.error || "Request failed"
      };
   }

   return response.json();
}

export async function deleteCartItem(productId: string) {
   const response = await fetch(`/api/v1/cart/item/${productId}`, {
      method: 'DELETE',
   });

   if (!response.ok) {
      const error = await response.json();
      throw {
         status: response.status,
         message: error.message || error.error || "Request failed"
      };
   }

   return response.json();
}