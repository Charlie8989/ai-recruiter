"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  CopyIcon,
  Ellipsis,
  ExternalLink,
  Mail,
  Slack,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const InterviewLink = (props) => {
  const { user } = useUser();
  const [usercredits, setCredits] = useState();

  const URL =
    process.env.NEXT_PUBLIC_HOST_URL + "/" + props?.interviewId?.interviewId;
  const getInterviewLink = () => {
    return URL;
  };

  useEffect(() => {
    if (user) {
      getuserDetails();
    }
  }, [user]);

  const getuserDetails = async () => {
    const response = await fetch(
      `/api/users?email=${encodeURIComponent(user?.email)}`
    );
    const data = await response.json();
    setCredits(data.user?.credits);
  };

  useEffect(() => {
    if (usercredits !== undefined) {
      updateCredits();
    }
  }, [usercredits]);

  const updateCredits = async () => {
    await fetch("/api/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user?.email, credits: usercredits - 1 }),
    });
  };

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(URL);
    toast("Link Copied");
  };

  const joinInterview = () => {
    window.open(URL, "_blank");
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-[#cbd5e8] bg-[#f8fafc] p-6 text-center shadow-[0_14px_35px_rgba(15,23,42,0.08)] sm:p-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eef2ff] text-[#2E318F] ring-1 ring-[#cbd5e8]">
          <CheckCircle2 className="h-9 w-9" />
        </div>
        <h2 className="mt-5 text-xl font-black sm:text-2xl">
          Your Interview Link Is Ready
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-600 sm:text-base">
          Share this link with your candidates to start the interview process
        </p>
      </div>

      <div className="my-6 w-full rounded-2xl border border-[#cbd5e8] bg-[#f8fafc] p-4 shadow-[0_14px_35px_rgba(15,23,42,0.08)] sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-lg font-black sm:text-xl">Interview Link</h3>
          <span className="w-fit rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-bold text-[#2E318F] ring-1 ring-[#cbd5e8] sm:text-sm">
            Valid For 30 days
          </span>
        </div>

        <div className="my-4 sm:my-6 flex flex-col sm:flex-row gap-2">
          <input
            className="border border-[#cbd5e8] flex-1 p-2 sm:p-3 font-medium text-sm sm:text-base text-gray-700 rounded-md sm:rounded-r-none bg-[#eef3fb]"
            defaultValue={getInterviewLink()}
            // defaultValue={"Debugging..."}
            disabled
          />
          <button
            onClick={() => onCopyLink()}
            className="flex items-center justify-center gap-2 rounded-md bg-[#2E318F] p-2 text-white transition-colors hover:bg-[#2E318F]/90 sm:rounded-l-none sm:p-3"
          >
            <CopyIcon className="w-4 h-4" />
            <span className="text-sm sm:text-base">Copy Link</span>
          </button>
        </div>

        <div className="mt-4 sm:mt-6 flex flex-wrap gap-3 sm:gap-4 text-gray-700">
          <span className="flex gap-2 items-center text-xs sm:text-sm">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{props.formdata?.duration}</span>
          </span>
          <span className="flex gap-2 items-center text-xs sm:text-sm">
            <Ellipsis className="w-4 h-4 flex-shrink-0" />
            <span>{props.usequestionlist.length} questions</span>
          </span>
          <span className="flex gap-2 items-center text-xs sm:text-sm">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            {/* <span>Expires: Nov 20, 2025</span> */}
          </span>
        </div>
      </div>

      <div className="my-6 w-full rounded-2xl border border-[#cbd5e8] bg-[#f8fafc] p-4 shadow-[0_14px_35px_rgba(15,23,42,0.08)] sm:p-6">
        <h3 className="mb-4 text-lg font-black sm:text-xl">Share Via</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="flex gap-2 items-center justify-center py-3 px-4 border rounded-md border-[#cbd5e8] bg-[#eef3fb] hover:bg-[#e7ecf5] transition-colors">
            <Mail className="w-4 h-4" />
            <span className="text-sm sm:text-base">Email</span>
          </button>
          <button className="flex gap-2 items-center justify-center py-3 px-4 border rounded-md border-[#cbd5e8] bg-[#eef3fb] hover:bg-[#e7ecf5] transition-colors">
            <Slack className="w-4 h-4" />
            <span className="text-sm sm:text-base">Slack</span>
          </button>
          <button className="flex gap-2 items-center justify-center py-3 px-4 border rounded-md border-[#cbd5e8] bg-[#eef3fb] hover:bg-[#e7ecf5] transition-colors">
            <img
              className="w-4 h-4"
              src="https://img.icons8.com/ios/50/whatsapp--v1.png"
              alt="WhatsApp"
            />
            <span className="text-sm sm:text-base">WhatsApp</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6">
        <Link href="/dashboard" className="w-full sm:w-auto">
          <Button className="w-full bg-[#eef3fb] text-gray-900 border border-[#cbd5e8] hover:bg-[#e7ecf5]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back To Dashboard
          </Button>
        </Link>
        <Button
          onClick={joinInterview}
          className="w-full sm:w-auto bg-[#2E318F] hover:bg-[#2E318F]/90"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Join Interview
        </Button>
      </div>
    </div>
  );
};

export default InterviewLink;
