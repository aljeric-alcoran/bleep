interface Metadata {
   keywords?: string[];
   seoTitle?: string;
   seoDescription?: string;
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