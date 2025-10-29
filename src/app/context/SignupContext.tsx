"use client";
import { createContext, useContext, useState } from "react";

interface SignupContextType {
   step: number;
   email: string | null;
   otp: string | null;
   setStep: (step: number) => void;
   setEmail: (email: string) => void;
   setOtp: (otp: string) => void;
   resetForm: () => void;
}

const SignupContext = createContext<SignupContextType | undefined>(undefined);

export function SignupProvider({ children }: { children: React.ReactNode }) {
   const [email, setEmail] = useState<string>('');
   const [otp, setOtp] = useState<string>('');
   const [step, setStep] = useState<number>(1);

   const resetForm = () => {
      setEmail('');
      setOtp('');
      setStep(1);
   };

   return (
      <SignupContext.Provider value={{ email, setEmail, otp, setOtp, step, setStep, resetForm }}>
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