import { SignupProvider } from "@/app/context/SignupContext";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Bleep |Signup",
};

export default function SignupLayout({ 
   children, 
}: { 
   children: React.ReactNode;
}) {
   return (
      <SignupProvider>
         {children}
      </SignupProvider>
   );
}