import { useUserStore } from "@/store/useUserStore";
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function loginUser({ 
   email, 
   password, 
   remember 
}: { 
   email: string, 
   password: string, 
   remember?: boolean 
}) {
   const response = await fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, remember }),
      credentials: 'include', 
   });

   return await response.json();
}

export async function logoutUser() {
   const response = await fetch('/api/auth/logout', {
      method: 'POST',
   });

   if (response.ok) {
      useUserStore.getState().clearUser();
   }
   else console.error('Logout failed.');
}

export async function redirectUser() {
   const response = await fetch(`${baseURL}/auth/me`, {
      method: 'GET',
      credentials: 'include',
   });
   return await response.json();
}

export async function requestAccessToken(refreshToken: string) {
   const response = await fetch(`${baseURL}/auth/refresh`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${refreshToken}`
      },
   });
 
   return await response.json();
}