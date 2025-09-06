const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function forgotPasswordRequest({ email } : { email: string }) {
   const response = await fetch(`${baseURL}/users/forgot-password-request`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
      credentials: 'include', 
   });

   const data = await response.json();
   return { status: response.status, message: data.message };
}

export const resetPassword = async(token: string, newPassword: string) => {
   const response = await fetch(`${baseURL}/users/reset-password`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ token, newPassword }),
   });
   const data = await response.json();
   return { status: response.status, message: data.message };
}