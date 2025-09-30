"use client";
import React, { useContext, useEffect } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Clock10Icon, MicOff, Phone } from "lucide-react";
import { useUser } from "@/app/provider";
import Vapi from "@vapi-ai/web";
import AlertConfirmation from "./_components/AlertConfirmation";

const startCall = async (interviewInfo, vapi) => {
  let questionList = "";
  interviewInfo?.questionList?.forEach(
    (item) => (questionList = (item?.question || "") + "," + questionList)
  );

  vapi.start("89d78948-79e7-4b5c-8913-eb2ce4ce8c0c", {
    "variableValues": {
      "userName": interviewInfo?.name || "User",
      "jobPosition": interviewInfo?.jobPosition || "the position",
      "questionList": questionList,
    },
  });

  vapi.on("call-start", () => console.log("Call started"));

  vapi.on("message", (message) => {
    if (message.type === "transcript") {
      console.log(`${message.role}: ${message.transcript}`);
    }
  });
};

const StartPage = () => {
  const { user } = useUser();
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
  const { interviewInfo } = useContext(InterviewDataContext);

  useEffect(() => {
    if (interviewInfo) {
      startCall(interviewInfo, vapi);
    }
  }, [interviewInfo, vapi]);

  const endInterview = () => {
    vapi.stop();
    vapi.on("call-end", () => console.log("Call ended"));
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full sm:w-[80vw] flex flex-col gap-3 text-white rounded-md p-5 h-[80vh] bg-zinc-800">
        <div className="flex justify-between items-center w-full px-4">
          <span className="font-bold uppercase text-white text-lg sm:text-2xl">
            {interviewInfo?.jobDescription || "AI"} INTERVIEW MEET
          </span>
          <span className="flex items-center sm:text-lg text-xs text-nowrap gap-2 text-white">
            <Clock10Icon className="w-4 h-4" />
            {interviewInfo?.duration ? interviewInfo.duration + " " : "Time "}
            left
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 flex-grow">
          <div className="sm:w-1/2 w-full sm:h-full h-1/2 bg-black rounded-md border border-white flex items-center flex-col gap-y-2 justify-center">
            <img
              src="https://imagedelivery.net/xE-VtsYZUS2Y8MtLMcbXAg/4a05b139a21e91fdb87f/sm"
              className="w-20 h-20 rounded-full"
            />
            <span className="text-gray-400">AI Recruiter</span>
          </div>
          <div className="sm:w-1/2 w-full sm:h-full h-1/2 bg-black rounded-md border flex-col gap-y-2 border-white flex items-center justify-center">
            <img
              src={
                user?.picture ||
                "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
              }
              className="w-20 h-20 rounded-full"
            />
            <span className="text-gray-400 capitalize">
              {interviewInfo?.name || "User"}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-auto flex-wrap">
          <button className="border cursor-pointer border-white/30 px-6 sm:px-10 py-3 sm:py-4 rounded-full flex items-center justify-center">
            <MicOff className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          <AlertConfirmation endInterview={endInterview}>
            <div className="inline-block">
              <button className="border cursor-pointer border-red-900 bg-red-700 px-6 sm:px-10 py-3 sm:py-4 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            </div>
          </AlertConfirmation>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
