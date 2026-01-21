export interface User {
   _id: string;
   firstname: string;
   lastname: string;
   email: string;
   phoneNumber?: string;
   gender?: "male" | "female" | "other" | null;
   birthday?: Date;
}