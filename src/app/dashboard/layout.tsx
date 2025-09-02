import AppBreadcrumb from "@/components/app-breadcrumb";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Metadata } from "next";

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
         <AppSidebar />
         <main className="w-full">
            <div className="w-full flex items-center gap-2 border-b py-4 px-3">
               <SidebarTrigger />
               <AppBreadcrumb />
            </div>
            <div className="p-5">
               {children}
            </div>
         </main>
    </SidebarProvider>
   );
}