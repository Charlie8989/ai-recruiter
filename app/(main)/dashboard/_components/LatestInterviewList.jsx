"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { InterviewGridSkeleton } from "@/components/interview-card-skeleton";
import InterviewCard from "./InterviewCard";

const PreviousCreated = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState();
  const [compactCards, setCompactCards] = useState(false);

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  useEffect(() => {
    const saved = window.localStorage.getItem("boloboss-settings");
    if (saved) {
      setCompactCards(Boolean(JSON.parse(saved)?.compactCards));
    }
  }, []);

  const GetInterviewList = async () => {
    const response = await fetch(
      `/api/interviews?email=${encodeURIComponent(user?.email)}&limit=6`
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
      {!interviewList && <InterviewGridSkeleton count={3} />}
      {interviewList?.length == 0 && (
        <Link
          href="/dashboard/create-interview"
          className="flex h-48 w-full flex-col items-center justify-center gap-y-3 rounded-xl border border-dashed border-[#9aa6d8] bg-[#f8fafc] text-center shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
        >
          <div className="w-full flex justify-center">
            <Video />
          </div>
          <p className="font-semibold text-gray-700">You Don't Have Any Interview Created !</p>
          <Button className="w-1/2 bg-[#2E318F] hover:bg-[#242773]">+ Create New Interview</Button>
        </Link>
      )}
      {interviewList && interviewList.length > 0 && (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {interviewList.map((interview, index) => (
            <InterviewCard
              interview={interview}
              key={index}
              onDeleted={removeInterview}
              compact={compactCards}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousCreated;
