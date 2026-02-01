export interface CartResponse {
   cart: Cart,
   items: CartItem[]
}

export interface Cart {
   id: string;
   total_items: number;
   total_price: number;
   status: "active" | "checked_out" | "abandoned";
}

export interface CartItem {
   id: string;
   product: CartItemProduct;
   quantity: number,
   price_at_time: number,
   subtotal: number,
   created_at: string
}

export interface CartItemProduct {
   _id: string;
   item_name: string;
   price: number;
   stock: number;
   images: string[]
}