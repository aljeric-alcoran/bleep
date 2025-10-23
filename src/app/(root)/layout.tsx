import type { Metadata } from "next";
import "@/app/assets/globals.css";
import AppMainHeader from "@/components/app-main-header";

export const metadata: Metadata = {
   title: "Bleep"
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <>
         <AppMainHeader/>
         {children}
      </>
   );
}
