"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

function InterviewCompleted() {
  const { interview_id } = useParams();
  const [feedback, setFeedback] = useState();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const response = await fetch(`/api/feedback?interviewID=${interview_id}`);
    const data = await response.json();
    setFeedback(data.feedback?.[0]?.feedback?.feedback?.summary);
    // console.log(feedback[0]?.feedback?.feedback?.summary);
  };

  return (
    <div className="flex justify-center w-full h-[90vh] items-center">
      <div className="sm:w-2/3 border-gray-400 rounded-md flex flex-col items-center w-1/2">
        <div className="flex items-center w-full flex-col">
          <img
            src="/completedIllustration.svg"
            className="sm:w-[200px] w-1/3"
          />
          <span className="font-bold mt-6 text-lg text-nowrap sm:text-2xl">
            Your Interview Is Completed
          </span>
          <p className="text-nowrap text-sm">
            You Can Get The AI Generated Feedback Below
          </p>
          <span className="text-nowrap text-lg mt-4">
            Thanks For Using Our Website
          </span>
          <div className="p-5 mt-3 sm:mt-7 w-[80vw] sm:w-[50vw] rounded-xl border flex flex-col gap-5 bg-blue-100 ">
            {feedback ? (
              <span className="text-blue-500 sm:text-md text-sm">{feedback}</span>
            ) : (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-[#bfd3ff]" />
                <Skeleton className="h-4 w-5/6 bg-[#bfd3ff]" />
                <Skeleton className="h-4 w-2/3 bg-[#bfd3ff]" />
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center gap-1 text-nowrap sm:gap-2 items-center">
          <Link href={"/scheduled-interview"}>
            <p className="underline sm:text-sm text-xs text-blue-500 mt-4">
              Feedback Here
            </p>
          </Link>
          <p className="mt-4">|</p>
          <Link href={"/dashboard"}>
            <p className="underline sm:text-sm text-xs text-blue-500 mt-4">
              Go to Dashboard
            </p>
          </Link>
          <p className="mt-4">|</p>
          <Link href={"https://www.linkedin.com/in/ayush-sahu-83r/"}>
            <p className="underline sm:text-sm text-xs text-blue-500 mt-4">
              contact us
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default InterviewCompleted;
