"use client";
import React from "react";
import InterviewHeader from "./_components/InterviewHeader";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Toaster } from "sonner";
import { InterviewDataProvider } from "@/context/InterviewDataContext";

const InterviewLayout = ({ children }) => {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <InterviewDataProvider>
        <div>
          <InterviewHeader />
          {children}
          <Toaster position="bottom-right" />
        </div>
      </InterviewDataProvider>
    </SessionContextProvider>
  );
};

export default InterviewLayout;
