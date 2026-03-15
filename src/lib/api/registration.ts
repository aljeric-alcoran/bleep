import { ApiError, api } from "./client";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

function messageFromErrorData(data: unknown, status: number): string {
   if (data && typeof data === "object") {
      const d = data as Record<string, unknown>;
      if (status === 429 && "error" in d && typeof d.error === "string")
         return d.error;
      const msg = d.message ?? d.error ?? d.detail;
      if (typeof msg === "string") return msg;
   }
   return "Request failed";
}

export async function requestEmailVerification(email: string) {
   try {
      const data = await api.post<{ message?: string }>(
         "/register/request-otp",
         { email },
         { baseURL }
      );
      return { status: 200, message: data?.message };
   } catch (err) {
      if (err instanceof ApiError)
         return {
            status: err.status,
            message: messageFromErrorData(err.data, err.status),
         };
      throw err;
   }
}

export async function verifyEmail(email: string | null, otp: string) {
   try {
      const data = await api.post<{ message?: string }>(
         "/register/verify-otp",
         { email, otp },
         { baseURL }
      );
      return { status: 200, message: data?.message };
   } catch (err) {
      if (err instanceof ApiError)
         return {
            status: err.status,
            message: messageFromErrorData(err.data, err.status),
         };
      throw err;
   }
}

type UserObject = {
   otp: string;
   firstname: string;
   lastname: string;
   email: string;
   password: string;
   phoneNumber: string;
};

export async function registerUser(userObject: UserObject) {
   try {
      const data = await api.post<{ message?: string }>(
         "/api/v1/register",
         userObject
      );
      return { status: 200, message: (data as { message?: string })?.message, data };
   } catch (err) {
      if (err instanceof ApiError)
         return {
            status: err.status,
            message: messageFromErrorData(err.data, err.status),
         };
      throw err;
   }
}
