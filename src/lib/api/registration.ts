import { ApiError, api } from "./client";
import { extractErrorMessage } from "../helpers/apiHelpers";
import type { UseRegistrationPayload } from "@/@types/user";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";


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
            message: extractErrorMessage(err.data),
         };
      throw err;
   }
}

export async function verifyEmail(email: string, otp: string) {
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
            message: extractErrorMessage(err.data),
         };
      throw err;
   }
}

export async function registerUser(userObject: UseRegistrationPayload) {
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
            message: extractErrorMessage(err.data),
         };
      throw err;
   }
}
