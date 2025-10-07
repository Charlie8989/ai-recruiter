"use client";
import { useUser } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import {
  ArrowLeft,
  Calendar,
  Clock,
  CopyIcon,
  Ellipsis,
  Mail,
  PlusIcon,
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
    const { data: Users, error } = await supabase
      .from("Users")
      .select("credits")
      .eq("email", user?.email)
      .single();
    if (error) console.error(error);
    else setCredits(Users?.credits);
  };

  useEffect(() => {
    if (usercredits !== undefined) {
      updateCredits();
    }
  }, [usercredits]);

  const updateCredits = async () => {
    const { data, error } = await supabase
      .from("Users")
      .update({ credits: usercredits - 1 })
      .eq("email", user?.email)
      .select();
  };

  const onCopyLink = async () => {
    await navigator.clipboard.writeText(URL);
    toast("Link Copied");
  };

  const joinInterview = () => {
    window.open(URL, "_blank");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col items-center p-6 sm:p-8 rounded-lg border border-gray-300 bg-white">
        <img
          src="/checktick.png"
          className="w-20 sm:w-24 md:w-28"
          alt="Check Tick"
        />
        <h2 className="font-semibold text-lg sm:text-xl md:text-2xl mt-4 text-center">
          Your Interview Link Is Ready
        </h2>
        <p className="text-sm sm:text-base text-gray-600 text-center mt-2 max-w-md">
          Share this link with your candidates to start the interview process
        </p>
      </div>

      <div className="my-6 p-4 sm:p-6 w-full border rounded-lg border-gray-300 bg-white">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-lg sm:text-xl font-semibold">Interview Link</h3>
          <span className="text-blue-600 py-1 px-3 rounded-md text-xs sm:text-sm bg-blue-100 w-fit">
            Valid For 30 days
          </span>
        </div>

        <div className="my-4 sm:my-6 flex flex-col sm:flex-row gap-2">
          <input
            className="border border-gray-300 flex-1 p-2 sm:p-3 font-medium text-sm sm:text-base text-gray-700 rounded-md sm:rounded-r-none bg-gray-50"
            defaultValue={getInterviewLink()}
            // defaultValue={"Debugging..."}
            disabled
          />
          <button
            onClick={() => onCopyLink()}
            className="bg-[#2E318F] hover:bg-[#2E318F]/90 text-white p-2 sm:p-3 flex justify-center items-center gap-2 rounded-md sm:rounded-l-none whitespace-nowrap transition-colors"
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
            <span>Expires: Nov 20, 2025</span>
          </span>
        </div>
      </div>

      <div className="my-6 p-4 sm:p-6 w-full border rounded-lg border-gray-300 bg-white">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Share Via</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button className="flex gap-2 items-center justify-center py-3 px-4 border rounded-md border-gray-300 hover:bg-gray-50 transition-colors">
            <Mail className="w-4 h-4" />
            <span className="text-sm sm:text-base">Email</span>
          </button>
          <button className="flex gap-2 items-center justify-center py-3 px-4 border rounded-md border-gray-300 hover:bg-gray-50 transition-colors">
            <Slack className="w-4 h-4" />
            <span className="text-sm sm:text-base">Slack</span>
          </button>
          <button className="flex gap-2 items-center justify-center py-3 px-4 border rounded-md border-gray-300 hover:bg-gray-50 transition-colors">
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
          <Button className="w-full bg-white text-gray-900 border border-gray-300 hover:bg-gray-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back To Dashboard
          </Button>
        </Link>
        <Button
          onClick={joinInterview}
          className="w-full sm:w-auto bg-[#2E318F] hover:bg-[#2E318F]/90"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Join Interview
        </Button>
      </div>
    </div>
  );
};

export default InterviewLink;
