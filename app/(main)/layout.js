import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-screen w-full bg-gray-100 text-gray-950">
        <WelcomeContainer />
         <Toaster />
        <div className="p-10">{children}</div>
      </div>
    </SidebarProvider>
  );
}
