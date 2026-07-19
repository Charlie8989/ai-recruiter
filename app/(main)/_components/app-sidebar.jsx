"use client";

import {
  Calendar,
  LayoutDashboard,
  List,
  Settings,
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
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  return (
    <Sidebar className="bg-[#f8fafc] text-gray-950 [&_[data-sidebar=sidebar]]:border-r [&_[data-sidebar=sidebar]]:border-[#d7deeb] [&_[data-sidebar=sidebar]]:bg-[#f8fafc] [&_[data-sidebar=sidebar]]:text-gray-950">
      <SidebarContent className="bg-[#f8fafc] text-gray-950">
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
            <SidebarMenu className="mt-3 overflow-hidden rounded-xl border border-[#d7deeb] bg-[#eef3fb]">
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="border-b border-[#d7deeb] last:border-b-0"
                >
                  <SidebarMenuButton
                    asChild
                    className={`h-12 rounded-none px-3 text-[15px] font-medium hover:bg-[#e2e9f5] ${
                      pathname === item.url || pathname.startsWith(item.url + "/")
                        ? "bg-[#dfe6f7] text-[#2E318F]"
                        : "text-gray-800"
                    }`}
                  >
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
