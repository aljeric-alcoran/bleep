export interface CartResponse {
   cart: Cart;
   items: CartItem[];
   total_price: number;
   total_discount: number;
   grand_total: number;
   total_selected_items: number;
   all_items_selected: boolean;
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
   quantity: number;
   price_at_time: number;
   has_discount: boolean;
   discounted_price: number;
   discount_total: number;
   subtotal: number;
   selected: boolean;
   discount_label: string;
   created_at: string;
}

export interface CartItemProduct {
   _id: string;
   item_name: string;
   stock: number;
   images: string[];
}