import { AppSidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ 
   children, 
}: { 
   children: React.ReactNode;
}) {
   return (
      <SidebarProvider>
         <AppSidebar />
         <main className="p-5">
            {children}
         </main>
    </SidebarProvider>
   );
}