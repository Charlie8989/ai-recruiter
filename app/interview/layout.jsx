"use client";
import React from "react";
import InterviewHeader from "./_components/InterviewHeader";
import { Toaster } from "sonner";
import { InterviewDataProvider } from "@/context/InterviewDataContext";

const InterviewLayout = ({ children }) => {
  return (
    <InterviewDataProvider>
      <div>
        <InterviewHeader />
        {children}
        <Toaster position="bottom-right" />
      </div>
    </InterviewDataProvider>
  );
};

export default InterviewLayout;
