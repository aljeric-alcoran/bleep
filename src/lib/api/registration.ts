const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const requestEmailVerification = async (email: string) => {
   const response = await fetch(`${baseURL}/api/register/request-otp`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      return { status: response.status, message: errorData.error };
   } else {
      const data = await response.json();
      return { status: response.status, message: data.message };
   }
}