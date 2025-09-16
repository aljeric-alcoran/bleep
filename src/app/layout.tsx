import { SignupProvider } from "@/app/context/SignupContext";
import type { Metadata } from "next";
import { rubik } from "./fonts";
import { Toaster } from "@/components/ui/sonner"
import "@/app/assets/globals.css";

export const metadata: Metadata = {
   title: "Bleep"
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${rubik.className} antialiased`} suppressHydrationWarning={true}>
            <SignupProvider>
               {children}
            </SignupProvider>
            <Toaster position="top-right" richColors/>
         </body>
      </html>
   );
}
