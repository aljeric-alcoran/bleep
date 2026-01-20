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

export const isObjectSharedKeyMatched = <
   T extends Record<string, any>,
   U extends Record<string, any>
>(obj1: T, obj2: U): boolean => {
   const sharedKeys = Object.keys(obj1).filter((key) => key in obj2);
   return sharedKeys.every(key => obj1[key] === obj2[key]);
}

export const numberInputOnly = (e: React.ChangeEvent<HTMLInputElement>): string => {
   let value = e.target.value.replace(/[^0-9.]/g, "");

   const parts = value.split(".");
   if (parts.length > 2) {
      value = parts[0] + "." + parts.slice(1).join("");
   }
   return value;
}

export const parseDecimalToLocalString = (value: any): string => {
   if (!value) return "0";
   if (typeof value === "number") return value.toLocaleString();
   if (typeof value === "string") return parseFloat(value).toLocaleString();
   if (value.$numberDecimal) return parseFloat(value.$numberDecimal).toLocaleString();
   if (value.toString) return parseFloat(value.toString()).toLocaleString();
   return "0";
}

export const parseDecimalToString = (value: any): string => {
   if (!value) return "0";
   if (typeof value === "number") return value.toString();
   if (typeof value === "string") return parseFloat(value).toString();
   if (value.$numberDecimal) return parseFloat(value.$numberDecimal).toString();
   if (value.toString) return parseFloat(value.toString()).toString();
   return "0";
}

interface NumberDecimal {
   $numberDecimal: string
}

export const priceDiscountCaculator = (price: NumberDecimal, discount: NumberDecimal) => {
   let originalPrice = Number(price['$numberDecimal']);
   let priceDiscount = parseFloat((Number(discount['$numberDecimal']) / 100).toFixed(2));
   let totalPrice = originalPrice - (originalPrice * priceDiscount);
   
   return parseDecimalToLocalString(totalPrice);
}

export const productHasDiscount = (discount: NumberDecimal): boolean => {
   return Number(discount['$numberDecimal']) > 0;
}