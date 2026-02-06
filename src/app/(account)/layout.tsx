import AppFooter from "@/components/app-footer";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Metadata } from "next";
import QueryClientProviders from "../providers/queryClientProvider";
import AppMainHeader from "@/components/app-main-header";

export const metadata: Metadata = {
   title: "Dashboard",
};

export default function DashboardLayout({ 
   children, 
}: { 
   children: React.ReactNode;
}) {
   return (
      <>
      <QueryClientProviders>
            <AppMainHeader/>
            <SidebarProvider className="min-h-auto">
               <div className="w-full bg-white">
                  <div className="max-w-7xl mx-auto">
                     <div className="flex mx-6">
                        <AppSidebar/>
                        <div className="w-full py-7 px-6 border-l bg-white">
                           {children}
                        </div>
                     </div>
                  </div>
               </div>
            </SidebarProvider>
            <AppFooter/>
         </QueryClientProviders>
      </>
   );
}