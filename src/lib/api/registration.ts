const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const requestEmailVerification = async (email: string) => {
   const response = await fetch(`${baseURL}/register/request-otp`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      return { status: response.status, message: response.status === 429 ? errorData.error : errorData.message };
   } else {
      const data = await response.json();
      return { status: response.status, message: data.message };
   }
}

export const verifyEmail = async (email: string | null, otp: string) => {
   const response = await fetch(`${baseURL}/register/verify-otp`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
   });

   if (!response.ok) {
      const errorData = await response.json();
      return { status: response.status, message: response.status === 429 ? errorData.error : errorData.message };
   } else {
      const data = await response.json();
      return { status: response.status, message: data.message };
   }
}

type User = {
   otp: string;
   firstname: string;
   lastname: string;
   email: string;
   password: string;
   phoneNumber: string;
}

export const registerUser = async (userObject: User) => {
   const response = await fetch("/api/v1/register", {
      method: 'POST',
      body: JSON.stringify(userObject),
   });

   const data = await response.json();
   console.log("REGISTRATION.TS: ", data);
   return { status: response.status, message: data.message };
}