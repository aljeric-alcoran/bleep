import { useUserStore } from "@/store/useUserStore";
import { redirect } from "next/navigation";
import { validateAccessToken } from "../helpers";

export async function loginUser({ 
   email, 
   password, 
   remember 
}: { 
   email: string, 
   password: string, 
   remember?: boolean 
}) {
   const response = await fetch("/api/v1/auth/login", {
      method: 'POST',
      body: JSON.stringify({ email, password, remember }),
   });

   
   if (!response.ok) throw new Error("Error: Failed to login user!");
   return response.json();
}

export async function logoutUser() {
   const response = await fetch("/api/v1/auth/logout", {
      method: 'POST',
   });

   if (response.ok) {
      useUserStore.getState().clearUser();
      redirect('/');
   }
   else throw new Error("Error: Logout failed!");
}

export async function redirectUser() {
   const response = await fetch("/api/v1/auth/me", {
      method: 'GET',
   });
   if (!response.ok) throw new Error("Unauthorized");

   const data = await response.json();

   return { ...data };
}

export async function requestAccessToken(baseURL: string = '', refreshToken: string) {
   const response = await fetch(`${baseURL}/api/v1/auth/refresh`, {
      method: 'GET',
      headers: {
         'Authorization': `Bearer ${refreshToken}`,
         'Content-Type': 'application/json',
      }
   });
 
   if (!response.ok) throw new Error("Error: Failed to get new access token!");
   return response.json();
}