"use client";
import React, { useContext, useEffect, useState } from "react";

import { useParams, useRouter } from "next/navigation";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Clock10Icon, Loader2, Loader2Icon, MicOff, Phone } from "lucide-react";
import { useUser } from "@/app/provider";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import Stopwatch from "./_components/Stopwatch";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";

const startCall = async (interviewInfo, vapi) => {
  let questionList = "";
  interviewInfo?.questionList?.forEach(
    (item) => (questionList = (item?.question || "") + "," + questionList)
  );

  vapi.start("89d78948-79e7-4b5c-8913-eb2ce4ce8c0c", {
    variableValues: {
      userName: interviewInfo?.name || "User",
      jobPosition: interviewInfo?.jobPosition || "the position",
      questionList: questionList,
      length: interviewInfo?.questionList.length || "5-7",
    },
  });

  // console.log(interviewInfo?.questionList.length)
};
const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

const StartPage = () => {
  const { user } = useUser();
  const { interview_id } = useParams();
  const { interviewInfo } = useContext(InterviewDataContext);
  const [userActive, setuserActive] = useState(false);
  const [conversation, setConversation] = useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (interviewInfo) {
      startCall(interviewInfo, vapi);
    }
  }, [interviewInfo, vapi]);

  vapi.on("call-start", () => toast("Meeting Joined Successfully"));

  vapi.on("speech-start", () => {
    setuserActive(false);
  });
  vapi.on("speech-end", () => {
    setuserActive(true);
  });
  // vapi.on("call-end", () => {
  //   toast("Meet Ended");
  //   GenerateFeedback();
  // });

  window.onload = () => {
    if (performance.getEntriesByType("navigation")[0].type === "reload") {
      vapi.stop();
      toast("Meet Ended");
    }
  };

  const GenerateFeedback = async () => {
    toast("Generating Response For Your Interview");
    const result = await axios.post("/api/ai-feedback", {
      conversation: conversation,
    });
    // console.log(result?.data);
    const Content = result.data.content;
    const FINAL_CONTENT = Content.replace("```json", "").replace("````", "");
    // console.log(FINAL_CONTENT);
    // console.log("I am from generate feedback");

    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interviewID: interview_id,
          feedback: JSON.parse(FINAL_CONTENT),
          recommended: false,
        },
      ])
      .select();
    // console.log(data);
    router.replace("/interview/" + interview_id + "/completed");
  };

  const endInterview = () => {
    vapi.stop();
    GenerateFeedback();
    setLoading(true);
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full sm:w-[80vw] flex flex-col gap-3 text-white rounded-md p-5 h-[80vh] bg-zinc-800">
        <div className="flex justify-between items-center w-full px-4">
          <span className="font-bold uppercase text-white text-lg sm:text-2xl">
            {interviewInfo?.jobPosition || "AI"} INTERVIEW MEET
          </span>
          <span className="flex items-center sm:text-lg text-xs text-nowrap gap-2 text-white">
            <Clock10Icon className="w-4 h-4" />
            <Stopwatch />
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 flex-grow">
          <div className="sm:w-1/2 w-full sm:h-full h-1/2 bg-black rounded-md border border-white flex items-center flex-col gap-y-2 justify-center">
            <span className="relative flex items-center justify-center">
              <span
                className={`absolute w-20 h-20 rounded-full bg-white border border-white ${
                  !userActive ? "animate-ping" : ""
                }`}
              ></span>
              <img
                src="https://imagedelivery.net/xE-VtsYZUS2Y8MtLMcbXAg/4a05b139a21e91fdb87f/sm"
                className="w-20 h-20 rounded-full relative"
              />
            </span>

            <span className="text-gray-400">AI Recruiter</span>
          </div>

          <div className="sm:w-1/2 w-full sm:h-full h-1/2 bg-black rounded-md border flex-col gap-y-2 border-white flex items-center justify-center">
            <span className="relative flex items-center justify-center">
              <span
                className={`absolute w-20 h-20 rounded-full bg-white border border-white ${
                  userActive ? "animate-ping" : ""
                }`}
              ></span>
              <img
                src={
                  user?.picture ||
                  "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                }
                className="w-20 h-20 rounded-full relative"
              />
            </span>

            <span className="text-gray-400 capitalize">
              {interviewInfo?.name || "User"}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-6 mt-auto flex-wrap">
          <button
            onClick={() => muteMicrophone()}
            className="border cursor-pointer border-white/30 px-6 sm:px-10 py-3 sm:py-4 rounded-full flex items-center justify-center"
          >
            <MicOff className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
          {/* <AlertConfirmation generateFeedback={() => GenerateFeedback()}> */}
          <div className="inline-block">
            <button
              onClick={endInterview}
              disabled={loading}
              className={`border gap-3 cursor-pointer border-red-900 bg-red-700 px-6 sm:px-10 py-3 sm:py-4 rounded-full flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading && <Loader2Icon className="w-4 animate-spin" />}{" "}
              <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
          {/* </AlertConfirmation> */}
        </div>
      </div>
    </div>
  );
};

export default StartPage;
