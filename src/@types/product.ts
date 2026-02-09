import { Category } from "./category";
import { Establishment } from "./establishment";
import { Metadata } from "./metadata";

export interface Product {
   _id?: string;
   establishment_id?: string;
   establishment?: Establishment;
   category_id?: string;
   category?: Category;
   seller_id?: string;
   item_name: string;
   description: string;
   price: number;
   hasDiscount: boolean;
   discounted_price: number;
   discount_amount: number;
   discount_label: string | null;
   stock: number;
   images?: [string];
   isAvailable: boolean;
   slug?: string;
   metadata?: Metadata;
}