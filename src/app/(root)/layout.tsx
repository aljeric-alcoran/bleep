import type { Metadata } from "next";
import "@/app/assets/globals.css";
import AppMainHeader from "@/components/app-main-header";
import QueryClientProviders from "../providers/queryClientProvider";

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
         <QueryClientProviders>
            {children}
         </QueryClientProviders>
      </>
   );
}
