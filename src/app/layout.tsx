import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/assets/globals.css";

export const metadata: Metadata = {
   title: "Bleep"
};

export const poppins = Poppins({
   subsets: ["latin"],
   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${poppins.className} antialiased`} suppressHydrationWarning={true}>
            {children}
         </body>
      </html>
   );
}
