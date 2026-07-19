"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { InterviewGridSkeleton } from "@/components/interview-card-skeleton";
import InterviewCard from "../dashboard/_components/InterviewCard";

const AllInterview = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const response = await fetch(
      `/api/interviews?email=${encodeURIComponent(user?.email)}`
    );
    const data = await response.json();
    setInterviewList(data.interviews || []);
  };
  return (
    <div>
    <h2 className="text-2xl font-bold">All Previously Created Interview</h2>
      {!interviewList && <div className="mt-5"><InterviewGridSkeleton /></div>}
      {interviewList?.length == 0 && (
        <Link
          href="/dashboard/create-interview"
          className= "mt-5 flex h-48 w-full flex-col items-center justify-center gap-y-3 rounded-xl border border-dashed border-[#9aa6d8] bg-[#f8fafc] text-center shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
        >
          <div className="w-full flex justify-center">
            <Video />
          </div>
          <p>You Don't Have Any Interview Created !</p>
          <Button className="w-1/2">+ Create New Interview</Button>
        </Link>
      )}
      {interviewList && interviewList.length > 0 && (
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} viewDetail={false}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllInterview;
