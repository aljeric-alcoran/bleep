'use server';

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

// export async function loginUser({ email, password }: { email: string, password: string }) {
//    const response = await fetch(`http://localhost:3002/api/auth/login`, {
//       method: 'POST',
//       headers: {
//          'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email, password }),
//    });
 
//    const data = await response.json();
//    return data; 
//  }

export async function loginUser({ email, password }: { email: string, password: string }) {
   const response = await fetch(`http://localhost:3000/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', 
   });

   return await response.json();
}

export async function googleLogin() {
   const response = await fetch('/api/auth/google', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json'
      }
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

export async function redirectUser() {
   const response = await fetch('/api/auth/me', {
      method: 'GET',
      credentials: 'include',
   });
   return response.json();
}

export async function requestAccessToken() {
   const cookieStore = await cookies();
   const refreshToken = cookieStore.get('refreshToken')?.value;
 
   if (!refreshToken) {
      return NextResponse.json({ message: 'No refresh token found' }, { status: 401 });
   }
 
   const response = await fetch(`http://localhost:3002/api/auth/refresh`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
   });
 
   const data = await response.json();
 
   if (!data.accessToken) {
      return NextResponse.json({ message: 'Failed to refresh token' }, { status: response.status });
   }
 
   return NextResponse.json(data, { status: 200 });
}