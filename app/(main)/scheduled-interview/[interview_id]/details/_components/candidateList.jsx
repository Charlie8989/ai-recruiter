import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

function CandidateList({ candidateList }) {
  // console.log("candidate", candidateList?.[0]?.feedback?.feedback?.rating);
  const { interview_id } = useParams();

  // console.log(candidateList);

  function getOverallRating(candidate) {
    const rating = candidate?.feedback?.feedback?.rating;

    if (!rating) return 0;

    const technical = Number(rating.technicalSkills) || 0;
    const problem = Number(rating.problemSolving) || 0;
    const experience = Number(rating.experience) || 0;
    const communication = Number(rating.communication) || 0;

    // count how many fields actually have a value
    const values = [technical, problem, experience, communication];
    const validValues = values.filter((v) => v > 0);

    if (validValues.length === 0) return 0; // nothing rated

    const total = validValues.reduce((a, b) => a + b, 0) / validValues.length;

    return total.toFixed(1);
  }

  return (
    <div className="w-full p-5">
      {!candidateList || candidateList.length === 0 ? (
        <div className="w-full bg-white rounded-md p-5 flex justify-center">
          No Candidates Yet
        </div>
      ) : (
        candidateList.map((candidate, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md p-4 rounded-md mb-4 flex justify-between items-center"
          >
            <div>
              <div className="flex gap-3 mb-1 items-center">
                <div className="rounded-full flex items-center justify-center w-8 h-8 bg-indigo-600 text-white text-sm font-bold">
                  {candidate?.userName?.[0] ?? "U"}
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">
                    {candidate?.userName ?? "User"}
                  </span>
                  <span className="sm:text-sm text-[10px] text-nowrap text-gray-500">
                    Completed on{" "}
                    {moment(candidate?.created_at ?? "N/A").format(
                      "DD MMM yyy"
                    )}
                  </span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                {candidate?.userEmail ?? "No Email"}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="px-2 py-1 border rounded-full text-green-600 font-semibold text-sm">
                {getOverallRating(candidate)}/10
              </span>
              <Link
                href={{
                  pathname: `/scheduled-interview/${interview_id}/report`,
                  query: {
                    candidateEmail: candidate.userEmail,
                    createdAt: candidate.created_at,
                  },
                }}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View Report
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default CandidateList;
