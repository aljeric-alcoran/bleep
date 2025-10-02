import Image from "next/image";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const metadata: Metadata = {
   title: "Dashboard",
};

export default function DashboardLayout({ 
   children, 
}: { 
   children: React.ReactNode;
}) {
   return (
      <SidebarProvider>
         <main className="w-full">
            <div className="w-max-screen">
               {children}
            </div>
         </main>
      </SidebarProvider>
   );
}