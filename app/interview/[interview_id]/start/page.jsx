"use client";
import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Clock10Icon, Lightbulb, Loader2Icon, Phone } from "lucide-react";
import { useUser } from "@/app/provider";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";
import Stopwatch from "./_components/Stopwatch";
import axios from "axios";

const StartPage = () => {
  const { user } = useUser();
  const { interview_id } = useParams();
  const { interviewInfo } = useContext(InterviewDataContext);

  const [userActive, setuserActive] = useState(false);
  const [conversation, setConversation] = useState();
  const [loading, setLoading] = useState(false);
  const [callReady, setCallReady] = useState(false);
  const [showGuidance, setShowGuidance] = useState(false);

  const router = useRouter();
  const vapiRef = useRef(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", () => {
      setCallReady(true);
      toast("Meeting Joined Successfully");
    });

    vapi.on("speech-start", () => {
      setuserActive(false);
    });

    vapi.on("speech-end", () => {
      setuserActive(true);
    });

    vapi.on("message", (message) => {
      if (message?.type === "transcript" && message?.transcriptType === "final") {
        setConversation((previous = []) => [
          ...previous,
          {
            role: message.role || "user",
            content: message.transcript || "",
          },
        ]);
      }
    });

    vapi.on("error", (e) => {
      // console.log("Vapi error:", e);
      setCallReady(false);
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
      setCallReady(false);
      toast("Could not connect to interview");
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

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: interviewInfo?.name,
          userEmail: interviewInfo?.userEmail,
          interviewID: interview_id,
          feedback: parsed,
          recommended: false,
        }),
      });

      if (!response.ok) throw new Error(await response.text());

      router.replace("/interview/" + interview_id + "/completed");
    } catch (err) {
      // console.log("Feedback error:", err);
      toast("Failed to generate feedback");
    }
  };
  return (
    <div className="flex min-h-[calc(100vh-80px)] justify-center bg-[#e7ecf5] p-4">
      <div className="relative flex h-[80vh] w-full flex-col gap-4 overflow-hidden rounded-2xl bg-[#202126] p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.18)] sm:w-[80vw]">
        {!callReady && !loading && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-[#202126]/85 text-center backdrop-blur-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
              <Loader2Icon className="h-8 w-8 animate-spin text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Joining interview room</h2>
              <p className="mt-1 text-sm text-gray-300">
                Connecting your AI recruiter and preparing the session.
              </p>
            </div>
          </div>
        )}
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
          <div className="sm:w-1/2 w-full sm:h-full h-1/2 bg-black rounded-xl border border-white/20 flex items-center flex-col gap-y-2 justify-center">
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

          <div className="sm:w-1/2 w-full sm:h-full h-1/2 bg-black rounded-xl border border-white/20 flex flex-col gap-y-2 items-center justify-center">
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

        {showGuidance && (
          <div className="rounded-xl border border-white/10 bg-white/[0.08] p-4 text-sm text-gray-200">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-white">
              <Lightbulb className="h-4 w-4" />
              Interview guidance
            </h3>
            <ul className="grid gap-1 sm:grid-cols-3">
              <li>Answer in 45-90 seconds.</li>
              <li>Use examples from your work.</li>
              <li>Pause briefly before answering.</li>
            </ul>
          </div>
        )}

        <div className="flex justify-center gap-4 mt-auto flex-wrap">
          <button
            onClick={() => setShowGuidance((value) => !value)}
            className="border cursor-pointer gap-2 border-white/20 bg-white/[0.08] px-6 sm:px-8 py-3 sm:py-4 rounded-full flex items-center justify-center text-sm font-semibold hover:bg-white/[0.12]"
          >
            <Lightbulb className="w-5 h-5" />
            {showGuidance ? "Hide Guidance" : "Show Guidance"}
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
