import { jwtVerify, decodeJwt } from "jose";
import { useUserStore } from "@/store/useUserStore";

export const validateResetToken = async(token: string): Promise<boolean> => {
   try {
      const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_RESET_PASSWORD_SECRET!);
      const resetToken = await jwtVerify(token, secret);
      console.log("Reset Token:", resetToken);
      return true;
   } catch (error: any) {
      return false;
   }
};

export const validateAccessToken = async(token: string): Promise<{ user: any, status: boolean }> => {
   try {
      const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);
      const { payload } = await jwtVerify(token, secret);
      
      return { user: payload, status: true };
   } catch (error: any) {
      return { user: {}, status: false };
   }
};

export function scheduleRefresh(accessToken: string, callback?: () => void) {
   const { exp } = decodeJwt(accessToken);
   if (!exp) return;
   const msUntilExpiry = exp * 1000 - Date.now() - 60_000; // refresh 1 min early
   if (msUntilExpiry > 0) {
      setTimeout(() => {
        useUserStore.getState().refresh();
      }, msUntilExpiry);
   }
   callback?.();
}

export function getNameInitials(firstname?: string, lastname?: string): string {
   const getFirstLetter = (value?: string): string =>
     value && value.trim().length > 0 ? value.trim().charAt(0).toUpperCase() : "";
 
   const firstInitial = getFirstLetter(firstname);
   const lastInitial = getFirstLetter(lastname);
 
   return `${firstInitial}${lastInitial}`.toUpperCase();
}

export function toISOStringDateFormat(date: Date) {
   const localDate = new Date(date);
   return localDate.toISOString();
}

export function formatDateWithOrdinal(date: Date) {
   const day = new Date(date).getDate();
   const month = new Date(date).toLocaleString("en-US", { month: "long" });
   const year = new Date(date).getFullYear();
 
   const ordinal =
      day % 10 === 1 && day !== 11
         ? "st"
         : day % 10 === 2 && day !== 12
         ? "nd"
         : day % 10 === 3 && day !== 13
         ? "rd"
         : "th";
 
   return `${month} ${day}${ordinal}, ${year}`;
}