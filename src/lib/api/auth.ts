import { NextRequest } from "next/server";

export async function loginUser({ email, password }: { email: string, password: string }) {
   const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
   });
   return response.json();
}

export async function logoutUser() {
   const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
   });
   
   if (response.ok) {
      window.location.href = '/login'; 
   } else {
      console.error('Logout failed.');
   }
}

export async function requestAccessToken(refreshToken: string, req: NextRequest) {
   const response = await fetch(`${req.nextUrl.origin}/api/auth/refresh`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${refreshToken}`
      },
      body: JSON.stringify({ refreshToken }),
   });
   return response.json();
}