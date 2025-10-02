"use client";
import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { useParams, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const ReportPage = () => {
  const { user } = useUser();
  const { interview_id } = useParams();
  const searchParams = useSearchParams();
  const candidateEmail = searchParams.get("candidateEmail");
  const createdAt = searchParams.get("createdAt");
  const [interviewDetail, setinterviewDetail] = useState();
  const [candidateFeedback, setCandidateFeedback] = useState();

  useEffect(() => {
    user && GetInterviewDetail();
  }, [user]);

  const GetInterviewDetail = async () => {
    const result = await supabase
      .from("interview")
      .select(
        "jobPosition,duration,jobDescription,type,questionList,interviewID,created_at,feedback(userEmail,userName,feedback,created_at)"
      )
      .eq("userEmail", user?.email)
      .eq("interviewID", interview_id);

    const detail = result?.data?.[0];
    setinterviewDetail(detail);

    // Find the feedback for the selected candidate and created_at
    if (detail && detail.feedback && candidateEmail && createdAt) {
      const feedback = detail.feedback.find(
        (f) => f.userEmail === candidateEmail && f.created_at === createdAt
      );
      setCandidateFeedback(feedback);
    }
  };

  const rating = candidateFeedback?.feedback?.feedback?.rating || {};

  const technical = Number(rating.technicalSkills) || 0;
  const problem = Number(rating.problemSolving) || 0;
  const experience = Number(rating.experience) || 0;
  const communication = Number(rating.communication) || 0;

  return (
    <div className="bg-gray-100 p-10">
      <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <img
            src={
              user?.picture ||
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1024px-Default_pfp.svg.png"
            }
            alt="Candidate Image"
            className="rounded-full w-16 h-16"
          />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              {candidateFeedback?.userName || "User"}
            </h2>
            <p className="text-sm text-gray-600 capitalize">
              {interviewDetail?.jobPosition || "Job Position"}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Skills Assessment
          </h3>
          <div className="space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Technical Skills
              </span>
              <div className="w-2/3">
                <Progress
                  value={technical * 10}
                  className="h-2 bg-blue-400 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-700">{technical}/10</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Problem Solving
              </span>
              <div className="w-2/3">
                <Progress
                  value={problem * 10}
                  className="h-2 bg-blue-400 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-700">{problem}/10</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Communication
              </span>
              <div className="w-2/3">
                <Progress
                  value={communication * 10}
                  className="h-2 bg-blue-400 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-700">{communication}/10</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                Experience
              </span>
              <div className="w-2/3">
                <Progress
                  value={experience * 10}
                  className="h-2 bg-blue-400 rounded-full"
                />
              </div>
              <span className="text-sm text-gray-700">{experience}/10</span>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Performance Summary
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            {candidateFeedback?.feedback?.summary ||
              "No summary available for this candidate."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
