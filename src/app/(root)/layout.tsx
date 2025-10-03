import type { Metadata } from "next";
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
      <>
         {children}
      </>
   );
}
