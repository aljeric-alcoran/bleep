const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function loginUser({ email, password }: { email: string, password: string }) {
   const response = await fetch(`${baseURL}/api/auth/login`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include', 
   });

   return await response.json();
}

export async function logoutUser() {
   const response = await fetch('/api/auth/logout', {
      method: 'POST',
   });

   if (response.ok) window.location.href = '/login'; 
   else console.error('Logout failed.');
}

export async function redirectUser() {
   const response = await fetch(`${baseURL}/api/auth/me`, {
      method: 'GET',
      credentials: 'include',
   });
   return await response.json();
}

export async function requestAccessToken(refreshToken: string) {
   const response = await fetch(`${baseURL}/api/auth/refresh`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${refreshToken}`
      },
   });
 
   return await response.json();
}