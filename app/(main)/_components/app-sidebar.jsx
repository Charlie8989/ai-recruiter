import {
  Calendar,
  LayoutDashboard,
  List,
  Settings,
  Wallet2Icon,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Interview Feedbacks",
    url: "/scheduled-interview",
    icon: Calendar,
  },
  {
    title: "All Interviews",
    url: "/all-interviews",
    icon: List,
  },

  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
        <Link href={"/dashboard"}>
          <SidebarGroupLabel className="text-2xl text-black font-bold my-4">
            BOLOBOSS
          </SidebarGroupLabel>
          </Link>
          <Link href={"/dashboard/create-interview"}>
            <Button className="mb-4">+ Create New Interview</Button>
          </Link>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
