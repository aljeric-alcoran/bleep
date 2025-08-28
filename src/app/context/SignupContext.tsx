"use client";
import { createContext, useContext, useState } from "react";

interface SignupContextType {
   email: string | null;
   otp: string | null;
   setEmail: (email: string) => void;
   setOtp: (otp: string) => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export function SignupProvider({ children }: { children: React.ReactNode }) {
   const [email, setEmail] = useState<string | null>(null);
   const [otp, setOtp] = useState<string | null>(null);

   return (
      <SignupContext.Provider value={{ email, setEmail, otp, setOtp }}>
         {children}
      </SignupContext.Provider>
   );
}

export function useSignup() {
   const context = useContext(SignupContext);
   if (!context) {
      throw new Error("useSignup must be used within a SignupProvider");
   }
   return context;
}