interface Metadata {
   keywords?: string[];
   seoTitle?: string;
   seoDescription?: string;
}

export interface Establishment {
   _id?: string;
   user_id?: string;
   name: string;
   address: string;
   phone: string
}

export interface Category {
   _id?: string;
   name: string;
   slug?: string;
   description?: string;
   parent?: string | null;
   image?: string;
   isActive?: boolean;
   order?: number;
   metadata?: Metadata;
   createdAt?: string;
   updatedAt?: string;
};

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
   discount_price?: number | null;
   stock: number;
   images?: [string];
   isAvailable: boolean;
   slug?: string;
   metadata?: Metadata;
}

export interface User {
   _id: string;
   firstname: string;
   lastname: string;
   email: string;
   phoneNumber?: string;
   gender?: "male" | "female" | "other" | null;
   birthday?: Date;
}

// * Response Types
export interface CategoriesResponse {
   status: string;
   code: number;
   message: string;
   data: Category[]
}

export interface CategoryResponse {
   status: string;
   code: number;
   message: string;
   data: Category
}