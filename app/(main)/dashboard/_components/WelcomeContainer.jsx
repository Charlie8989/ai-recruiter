"use client";
import { useUser } from "@/app/provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const WelcomeContainer = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center px-6 w-full bg-[#fbfcff] rounded-md border-b border-[#d7deeb] p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
      {/* Left Side (Sidebar + Welcome Text) */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          {user ? (
            <>
              <h2 className="text-2xl font-bold">Welcome Back, {user?.name}</h2>
              <h2 className="text-sm text-gray-600">
                AI-Driven Interviews, Hassle-Free Hiring
              </h2>
            </>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-7 w-64 bg-[#e4e9f5]" />
              <Skeleton className="h-4 w-56 bg-[#e4e9f5]" />
            </div>
          )}
        </div>
      </div>

      {/* Right Side (Notifications + Profile) */}
      <div className="flex gap-4 items-center">
        <Bell className="w-5 h-5 cursor-pointer" />
        {user ? (
          <Link href={'/settings'}><img
            src={user?.picture||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3YkerCVdYtyi2McC6l-feLDSDl2KDOzFig&s"}
            className="cursor-pointer w-8 h-8 rounded-full"
            alt=""
          /></Link>
        ) : (
          <Skeleton className="h-8 w-8 rounded-full bg-[#e4e9f5]" />
        )}
        
      </div>
    </div>
  );
};

export default WelcomeContainer;
