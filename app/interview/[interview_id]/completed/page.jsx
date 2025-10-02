"use client";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";

function InterviewCompleted() {
  const { interview_id } = useParams();

  useEffect(() => {
    GetFeedback();
  },[]);

  const GetFeedback = async () => {
    let { data: feedback, error } = await supabase
      .from("feedback")
      .select('feedback')
      .eq("interviewID", interview_id);
    console.log(feedback);
  };

  return (
    <div className="flex justify-center w-full h-[90vh] items-center">
      <div className="sm:w-2/3 border-gray-400 rounded-md flex flex-col items-center w-1/2">
        <div className="flex items-center w-full flex-col">
          <img src="/completedIllustration.svg" className="sm:w-[200px] w-1/3" />
          <span className="font-bold mt-6 text-lg text-nowrap sm:text-2xl">
            Your Interview Is Completed
          </span>
          <p className="text-nowrap text-sm">You Can Get The AI Generated Feedback Below</p>
          <span className="text-nowrap text-lg mt-4">Thanks For Using Our Website</span>
          <div className="p-5 mt-3 sm:mt-7 w-[80vw] sm:w-[50vw] rounded-xl border flex flex-col gap-5 bg-blue-100 ">
            <span className="text-blue-500 sm:text-md text-sm">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. At
              quibusdam neque amet expedita suscipit culpa dolor laboriosam
              assumenda perspiciatis modi!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewCompleted;
