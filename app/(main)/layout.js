import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import WelcomeContainer from "./dashboard/_components/WelcomeContainer";

export default function Layout({ children }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <span>
          {/* <SidebarTrigger /> */}
        </span>
        <WelcomeContainer />

        <div className="p-10">{children}</div>
      </div>
    </SidebarProvider>
  );
}
