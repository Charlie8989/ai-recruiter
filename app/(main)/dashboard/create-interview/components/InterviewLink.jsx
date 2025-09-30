import { Button } from "@/components/ui/button";
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
import React from "react";
import { toast } from "sonner";

const InterviewLink = (props) => {
  // console.log(props);
  // console.log(props.formdata)
  // console.log(props.formdata.duration);
  // console.log(props.InterviewId);
  // console.log(props.usequestionlist.length);
  const URL = process.env.NEXT_PUBLIC_HOST_URL + "/" + props.interviewId.interviewId;

  const getInterviewLink = () => {
    // console.log(URL);
    return URL;
  };

  const onCopyLink=async ()=>{
      await navigator.clipboard.writeText(URL);
      toast("Link Copied");
  }

  // const URL = process.env.NEXT_PUBLIC_HOST_URL + "/" + InterviewId.interviewId;
  //   console.log(URL);

  return (
    <div>
      <div>
        <div className="flex flex-col items-center p-4 rounded-md border border-gray-300">
          <img
            src="/checktick.png"
            className="mx-auto"
            width={100}
            alt="Check Tick"
          />
          <h2 className="font-semibold text-lg">
            Your Interview Link Is Ready
          </h2>
          <p className="text-sm">
            Share this link with your candidates to start the interview process
          </p>
        </div>

        <div className="my-4 p-5 w-full border rounded-md border-gray-300">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Interview Link</h3>
            <span className="text-blue-400 p-1 px-2 rounded-md text-sm bg-blue-200">
              valid For 30 days
            </span>
          </div>

          <div className="my-4 flex items-center justify-center">
            <input
              className="border border-gray-200 w-[26em] p-2 font-medium underline
           text-black"
              defaultValue={getInterviewLink()}
              // defaultValue={"Debugging Now"}
              disabled
            />
            <button onClick={()=>onCopyLink()} className="bg-[#2E318F] text-white p-2 flex justify-between items-center h-full">
              <CopyIcon className="w-4" />
              Copy Link
            </button>
          </div>

          <div className="mt-6 flex gap-4">
            <span className="flex gap-1 items-center text-sm">
              <Clock className="w-4" /> {props.formdata?.duration}
            </span>
            <span className="flex gap-1 items-center text-sm">
              <Ellipsis className="w-4" />{props.usequestionlist.length} questions
            </span>
            <span className="flex gap-1 items-center text-sm">
              <Calendar className="w-4" /> Expires: Nov 20, 2025
            </span>
          </div>
        </div>

        <div className="my-4 p-5 w-full border rounded-md border-gray-300">
          <h3 className="text-lg font-semibold">Share Via</h3>
          <div className="flex items-center mt-4 gap-3">
            <span className="flex gap-2 w-1/3 items-center justify-center py-2 px-10 border rounded-md  border-gray-200 ">
              <Mail className="w-4" />
              Email
            </span>
            <span className="flex gap-2 w-1/3 items-center justify-center py-2 px-10 border rounded-md  border-gray-200 ">
              <Slack className="w-4" />
              Slack
            </span>
            <span className="flex items-center justify-center gap-2 w-1/3 py-2 px-10 border rounded-md  border-gray-200 ">
              <img
                className="w-4 h-4"
                src="https://img.icons8.com/ios/50/whatsapp--v1.png"
                alt="whatsapp--v1"
              />{" "}
              WhatsApp
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-between gap-2 mt-4">
        <Link href="/dashboard">
          <Button className="bg-transparent text-black border border-gray-200 hover:bg-transparent">
            <ArrowLeft className="w-4" /> Back To Dashboard
          </Button>
        </Link>

        <Link href="/dashboard/create-interview">
          <Button>
            <PlusIcon className="w-4 " /> Create New Interview
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default InterviewLink;
