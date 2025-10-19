type Metadata = {
   keywords?: string[];
   seoTitle?: string;
   seoDescription?: string;
}

export type Category = {
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