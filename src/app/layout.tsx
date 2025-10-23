import type { Metadata } from "next";
import { rubik } from "./fonts";
import "@/app/assets/globals.css";
import { Toaster } from "sonner";
import { SignupProvider } from "./context/SignupContext";

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
            <Toaster position="top-right" richColors/>
            <SignupProvider>
               {children}
            </SignupProvider>
         </body>
      </html>
   );
}
