"use client";
import { useUser } from "@/app/provider";
import React, { useEffect, useState } from "react";
import InterviewCard from "../dashboard/_components/InterviewCard";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";
import { InterviewGridSkeleton } from "@/components/interview-card-skeleton";

function ScheduledInterview() {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState();
  const [compactCards, setCompactCards] = useState(false);

  useEffect(() => {
    user && getInterviewList();
  }, [user]);

  useEffect(() => {
    const saved = window.localStorage.getItem("boloboss-settings");
    if (saved) {
      setCompactCards(Boolean(JSON.parse(saved)?.compactCards));
    }
  }, []);

  const getInterviewList = async () => {
    const response = await fetch(
      `/api/interviews?email=${encodeURIComponent(
        user?.email
      )}&includeFeedback=true`
    );
    const data = await response.json();
    setInterviewList(data.interviews || []);
  };

  const removeInterview = (interviewId) => {
    setInterviewList((list = []) =>
      list.filter((interview) => interview.interviewID !== interviewId)
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold">
        Interview List With Candidate Feedback
      </h2>
      {!interviewList && <div className="mt-5"><InterviewGridSkeleton /></div>}
      {interviewList?.length == 0 && (
        <Link
          href="/dashboard/create-interview"
          className="mt-5 flex h-48 w-full flex-col items-center justify-center gap-y-3 rounded-xl border border-dashed border-[#9aa6d8] bg-[#f8fafc] text-center shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
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
            <InterviewCard
              interview={interview}
              key={index}
              viewDetail={true}
              onDeleted={removeInterview}
              compact={compactCards}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ScheduledInterview;
