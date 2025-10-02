"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState([]);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  const getInterviewList = async () => {
    const result = await supabase
      .from("interview")
      .select("jobPosition,duration,interviewID,feedback(userEmail)")
      .eq("userEmail", user?.email)
      .order("id", { ascending: false });

    // console.log(result);
    setInterviewList(result.data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Interview List With Candidate Feedback
      </h2>
      {interviewList?.length == 0 && (
        <Link
          href="/dashboard/create-interview"
          className="mt-5 w-full h-40 gap-y-2 flex flex-col justify-center items-center bg-white border-1 border-black border-dashed rounded-md text-center"
        >
          <div className="w-full flex justify-center">
            <Video />
          </div>
          <p>You Don't Have Any Interview Created !</p>
          <Button className="w-1/2">+ Create New Interview</Button>
        </Link>
      )}
      {interviewList && (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          {interviewList.map((interview, index) => (
            <InterviewCard
              interview={interview}
              key={index}
              viewDetail={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;
