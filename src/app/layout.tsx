import { SignupProvider } from "@/app/context/SignupContext";
import type { Metadata } from "next";
import { rubik } from "./fonts";
import { Toaster } from "@/components/ui/sonner"
import AppHeader from "@/components/app-header";
import AppSearch from "@/components/app-search";
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
            <Toaster position="top-right" richColors/>
            <SignupProvider>
               <header className="border-b pb-6 bg-linear-to-t from-red-600 to-red-800 text-white">
                  <nav className="bg-transparent border-gray-200 px-4 lg:px-6 mx-auto max-w-screen-xl">
                     <div className="w-full flex flex-wrap justify-between items-center">
                        <AppHeader />
                        <AppSearch />
                     </div>
                  </nav>
               </header>
               {children}
            </SignupProvider>
         </body>
      </html>
   );
}
