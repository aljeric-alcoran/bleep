export type Category = {
   _id?: string;
   name: string;
   slug?: string;
   description?: string;
   parent?: string | null;
   image?: string;
   isActive?: boolean;
   order?: number;
   metadata?: {
      keywords?: string[];
      seoTitle?: string;
      seoDescription?: string;
   };
   createdAt?: string;
   updatedAt?: string;
};