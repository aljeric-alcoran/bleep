import { jwtVerify } from "jose";

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