import { Category } from "./category";
import { Establishment } from "./establishment";
import { Metadata } from "./metadata";

interface NumberDecimal {
   $numberDecimal: string
}

export interface Product {
   _id?: string;
   establishment_id?: string;
   establishment?: Establishment;
   category_id?: string;
   category?: Category;
   seller_id?: string;
   item_name: string;
   description: string;
   price: NumberDecimal;
   discount_price: NumberDecimal;
   stock: number;
   images?: [string];
   isAvailable: boolean;
   slug?: string;
   metadata?: Metadata;
}