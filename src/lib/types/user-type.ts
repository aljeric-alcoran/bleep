export type User = {
   _id?: string;
   firstname: string;
   lastname: string;
   phoneNumber?: string;
   email?: string;
   gender?: "male" | "female" | "other" | null;
   birthday?: Date;
}