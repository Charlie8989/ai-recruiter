import { useUser } from "@/app/provider";
import { Calendar, Clock, TagIcon } from "lucide-react";
import moment from "moment";
import React from "react";

function JobDetails({ interviewDetail }) {
  // const { user } = useUser();
  // console.log(interviewDetail);

  if (!interviewDetail) return null;

  return (
    <div className="w-full rounded-md bg-white p-5">
      <div>
        <p className="text-lg mb-3 capitalize font-bold">
          {interviewDetail.jobPosition}
        </p>
      </div>
      <div className="flex flex-row w-full justify-between">
        <div>
          <p className="text-gray-400 text-sm">Duration</p>
          <p className="flex flex-row gap-2 items-center mt-1">
            <Clock className="w-4" />
            <span className="text-xs sm:text-sm">
              {interviewDetail.duration}
            </span>
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm">Created On</p>
          <p className="flex flex-row gap-2 items-center mt-1">
            <Calendar className="w-4" />
            <span className="text-xs sm:text-sm">
              {moment(interviewDetail.created_at).format("DD MMM YYYY")}
            </span>
          </p>
        </div>
        <div className="sm:block hidden">
          <p className="text-gray-400 text-sm">Type</p>
          <p className="flex flex-row gap-2 items-center mt-1">
            <TagIcon className="w-4" />
            <span className="text-xs sm:text-sm">
              {Array.isArray(interviewDetail.type)
                ? interviewDetail.type.join(", ")
                : (JSON.parse(interviewDetail.type || "[]") || []).join(", ")}
            </span>
          </p>
        </div>
      </div>
      <div>
        <p className="text-lg mt-4 font-bold">Job Description</p>
        <p className="mb-3">{interviewDetail.jobDescription}</p>
      </div>
      <div>
        <p className="text-lg font-bold mt-4">Interview Questions</p>
        <ul className="flex font-semibold flex-col gap-2 ml-5 list-disc marker:text-blue-700">
          {interviewDetail.questionList &&
            interviewDetail.questionList.map((q, index) => (
              <li key={index}>{q.question}</li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default JobDetails;
