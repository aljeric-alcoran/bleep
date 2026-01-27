import type { Metadata } from "next";
import "@/app/assets/globals.css";
import AppMainHeader from "@/components/app-main-header";
import QueryClientProviders from "../providers/queryClientProvider";
import AppFooter from "@/components/app-footer";

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
            <div className="w-full mx-auto bg-gray-50 py-8">
               <div className="max-w-screen-xl mx-auto px-4 lg:px-6">
                  {children}
               </div>
            </div>
            <AppFooter />
         </QueryClientProviders>
      </>
   );
}
