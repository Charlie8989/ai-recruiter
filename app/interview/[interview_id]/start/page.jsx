"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Clock10Icon, Loader2Icon, MicOff, Phone } from "lucide-react";
import { useUser } from "@/app/provider";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import Stopwatch from "./_components/Stopwatch";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";

const StartPage = () => {
  const { user } = useUser();
  const { interview_id } = useParams();
  const { interviewInfo } = useContext(InterviewDataContext);

  const [userActive, setuserActive] = useState(false);
  const [conversation, setConversation] = useState();
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const vapiRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      toast("Meeting Joined Successfully");
    });

    vapi.on("speech-start", () => {
      setuserActive(false);
    });

    vapi.on("speech-end", () => {
      setuserActive(true);
    });

    vapi.on("error", (e) => {
      // console.log("Vapi error:", e);
      toast("Something went wrong with call");
    });

    vapi.on("call-end", () => {
      toast("Meeting Ended");
    });

    return () => {
      vapi.stop();
    };
  }, []);

  useEffect(() => {
    if (!interviewInfo || !vapiRef.current || hasStarted.current) return;
    hasStarted.current = true;
    startCall(interviewInfo, vapiRef.current);
  }, [interviewInfo]);

  const startCall = async (interviewInfo, vapi) => {
    let questionList = "";

    interviewInfo?.questionList?.forEach((item) => {
      questionList += (item?.question || "") + ",";
    });

    try {
      await vapi.start("4ab170a7-a305-45e2-b6b0-17aa386b2798", {
        variableValues: {
          userName: interviewInfo?.name || "User",
          jobPosition: interviewInfo?.jobPosition || "the position",
          questionList,
          length: interviewInfo?.questionList.length || "5-7",
        },
      });
    } catch (err) {
      // console.log("Start failed:", err);
    }
  };

  const endInterview = () => {
    vapiRef.current?.stop();
    GenerateFeedback();
    setLoading(true);
  };

  const GenerateFeedback = async () => {
    try {
      if (!conversation || conversation.length === 0) {
        toast("No conversation to analyze");
        setTimeout(() => {
          router.replace("/dashboard");
        }, 1500);
        return;
      }

      toast("Generating Response For Your Interview");

      const result = await axios.post("/api/ai-feedback", {
        conversation,
      });

      const content = result?.data?.content;

      if (!content) throw new Error("Empty AI response");

      const cleaned = content.replace(/```json|```/g, "").trim();

      let parsed;
      try {
        parsed = JSON.parse(cleaned);
      } catch {
        parsed = { raw: cleaned };
      }

      const { error } = await supabase.from("feedback").insert([
        {
          userName: interviewInfo?.userName,
          userEmail: interviewInfo?.userEmail,
          interviewID: interview_id,
          feedback: parsed,
          recommended: false,
        },
      ]);

      if (error) throw error;

      router.replace("/interview/" + interview_id + "/completed");
    } catch (err) {
      // console.log("Feedback error:", err);
      toast("Failed to generate feedback");
    }
  };
  const muteMicrophone = () => {
    // console.log("Mute logic here");
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
              />
              <img
                src="https://imagedelivery.net/xE-VtsYZUS2Y8MtLMcbXAg/4a05b139a21e91fdb87f/sm"
                className="w-20 h-20 rounded-full relative"
              />
            </span>

            <span className="text-gray-400">AI Recruiter</span>
          </div>

          <div className="sm:w-1/2 w-full sm:h-full h-1/2 bg-black rounded-md border border-white flex flex-col gap-y-2 items-center justify-center">
            <span className="relative flex items-center justify-center">
              <span
                className={`absolute w-20 h-20 rounded-full bg-white border border-white ${
                  userActive ? "animate-ping" : ""
                }`}
              />
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
            onClick={muteMicrophone}
            className="border cursor-pointer border-white/30 px-6 sm:px-10 py-3 sm:py-4 rounded-full flex items-center justify-center"
          >
            <MicOff className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>

          <div className="inline-block">
            <button
              onClick={endInterview}
              disabled={loading}
              className={`border gap-3 cursor-pointer border-red-900 bg-red-700 px-6 sm:px-10 py-3 sm:py-4 rounded-full flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading && <Loader2Icon className="w-4 animate-spin" />}
              <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartPage;
