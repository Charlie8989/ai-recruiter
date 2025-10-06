"use client";
import { useUser } from "@/app/provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import React from "react";

const WelcomeContainer = () => {
  const { user } = useUser();
  return (
    <div className="flex justify-between items-center px-6 w-full bg-white rounded-md p-4">
      {/* Left Side (Sidebar + Welcome Text) */}
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div>
          <h2 className="text-2xl font-bold">Welcome Back, {user?.name}</h2>
          <h2 className="text-sm text-gray-600">
            AI-Driven Interviews, Hassle-Free Hiring
          </h2>
        </div>
      </div>

      {/* Right Side (Notifications + Profile) */}
      <div className="flex gap-4 items-center">
        <Bell className="w-5 h-5 cursor-pointer" />
        <img
          src={user?.picture||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO3YkerCVdYtyi2McC6l-feLDSDl2KDOzFig&s"}
          className="cursor-pointer w-8 h-8 rounded-full"
          alt=""
        />
      </div>
    </div>
  );
};

export default WelcomeContainer;
