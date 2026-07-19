import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="min-h-screen w-full bg-[#e7ecf5] text-gray-950">
        <WelcomeContainer />
         <Toaster />
        <div className="p-6 sm:p-10">{children}</div>
      </div>
    </SidebarProvider>
  );
}
