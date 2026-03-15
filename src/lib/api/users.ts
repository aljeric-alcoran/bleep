import { User } from "@/@types";
import { ApiError, api } from "./client";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL ?? "";

function messageFromErrorData(data: unknown): string {
   if (data && typeof data === "object" && "message" in (data as object))
      return String((data as { message: unknown }).message);
   if (data && typeof data === "object" && "error" in (data as object))
      return String((data as { error: unknown }).error);
   return "Request failed";
}

export async function forgotPasswordRequest({ email }: { email: string }) {
   try {
      const data = await api.post<{ message?: string }>(
         "/users/forgot-password-request",
         { email },
         { baseURL, credentials: "include" }
      );
      return { status: 200, message: data?.message };
   } catch (err) {
      if (err instanceof ApiError)
         return { status: err.status, message: messageFromErrorData(err.data) };
      throw err;
   }
}

export async function resetPassword(token: string, newPassword: string) {
   try {
      const data = await api.post<{ message?: string }>(
         "/users/reset-password",
         { token, newPassword },
         { baseURL, credentials: "include" }
      );
      return { status: 200, message: data?.message };
   } catch (err) {
      if (err instanceof ApiError)
         return { status: err.status, message: messageFromErrorData(err.data) };
      throw err;
   }
}

export async function updateUserDetails(
   userObject: User,
   userId: string | undefined
) {
   return api.put(`/users/${userId}`, userObject, {
      baseURL,
      credentials: "include",
   });
}
