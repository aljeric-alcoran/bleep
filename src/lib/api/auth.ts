import { useUserStore } from "@/store/useUserStore";
import { redirect } from "next/navigation";
import { api } from "./client";

export async function loginUser({
   email,
   password,
   remember,
}: {
   email: string;
   password: string;
   remember?: boolean;
}) {
   return api.post("/api/v1/auth/login", { email, password, remember });
}

export async function logoutUser() {
   await api.post("/api/v1/auth/logout");
   useUserStore.getState().clearUser();
   redirect("/");
}

export async function redirectUser() {
   return api.get<Record<string, unknown>>("/api/v1/auth/me");
}

export async function requestAccessToken(
   baseURL: string = "",
   refreshToken: string
) {
   return api.get("/api/v1/auth/refresh", {
      baseURL,
      headers: {
         Authorization: `Bearer ${refreshToken}`,
         "Content-Type": "application/json",
      },
   });
}