"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import InterviewCard from "./InterviewCard";

const PreviousCreated = () => {
  const { user } = useUser();
  const [interviewList, setInterviewList] = useState();

  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const response = await fetch(
      `/api/interviews?email=${encodeURIComponent(user?.email)}&limit=6`
    );
    const data = await response.json();
    setInterviewList(data.interviews || []);
  };

  return (
    <div>
      {interviewList?.length == 0 && (
        <Link
          href="/dashboard/create-interview"
          className="w-full h-40 gap-y-2 flex flex-col justify-center items-center bg-white border-1 border-black border-dashed rounded-md text-center"
        >
          <div className="w-full flex justify-center">
            <Video />
          </div>
          <p>You Don't Have Any Interview Created !</p>
          <Button className="w-1/2">+ Create New Interview</Button>
        </Link>
      )}
      {interviewList && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
          {interviewList.map((interview, index) => (
            <InterviewCard interview={interview} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PreviousCreated;
