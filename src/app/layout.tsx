import { SignupProvider } from "@/app/context/SignupContext";
import type { Metadata } from "next";
import { rubik } from "./fonts";
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
         </body>
      </html>
   );
}
