"use client";
import { useUser } from "@/app/provider";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell } from "lucide-react";
import React from "react";

const WelcomeContainer = () => {
  const { user } = useUser();
  console.log(user);
  return (
    <>
      {/* <span className="relative top-10 right-3">
        <SidebarTrigger />
      </span> */}
      <div className="flex justify-between px-10 w-full bg-white rounded-md p-4">
        <div className="w-full ">
          <h2 className="text-2xl font-bold">Welcome Back,{user?.name}</h2>
          <h2>AI-Driven Interviews,Hassle-Free Hiring</h2>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <div className="text-end">
            <Bell className="w-4 h-4 cursor-pointer" />
          </div>
          <img
            src={user?.picture}
            className="cursor-pointer w-8 h-8 rounded-full"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

export default WelcomeContainer;
