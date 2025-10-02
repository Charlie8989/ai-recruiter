"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import JobDetails from "./_components/jobDetails";
import CandidateList from "./_components/candidateList";

function InterviewDetail() {
  const { interview_id } = useParams();
  const { user } = useUser();
  const [interviewDetail, setinterviewDetail] = useState();

  useEffect(() => {
    user && GetInterviewDetail();
  }, [user]);

  // console.log("interview feedback", interviewDetail?.feedback);

  const GetInterviewDetail = async () => {
    const result = await supabase
      .from("interview")
      .select(
        "jobPosition,duration,jobDescription,type,questionList,interviewID,created_at,feedback(userEmail,userName,feedback,created_at)"
      )
      .eq("userEmail", user?.email)
      .eq("interviewID", interview_id);

    setinterviewDetail(result?.data?.[0]);
  };
  return (
    <div>
      <div className="text-2xl font-bold mb-1 sm:mb-3">Interview Details</div>
      <JobDetails interviewDetail={interviewDetail} />
      <div className="text-2xl font-bold my-1 sm:my-3">
        Candidates ({interviewDetail?.["feedback"]?.length || "0"})
      </div>
      
        <CandidateList candidateList={interviewDetail?.feedback} />
    </div>  
  );
}

export default InterviewDetail;
