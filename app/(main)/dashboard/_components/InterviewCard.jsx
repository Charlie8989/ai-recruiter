import { Button } from "@/components/ui/button";
import { Copy, Info, Send, Video } from "lucide-react";
import moment from "moment";
import React from "react";
import { toast } from "sonner";
import Link from "next/link";

function InterviewCard({ interview, viewDetail = false }) {
  const URL = process.env.NEXT_PUBLIC_HOST_URL + "/" + interview?.interviewID;

  const copyURL = async () => {
    await navigator.clipboard.writeText(URL);
    toast("Link Copied");
  };

  const onSend = () => {
    const subject = encodeURIComponent("BOLOBOSS Interview Link");
    const body = encodeURIComponent(
      `Thanks for using BOLOBOSS!

Here is your interview link:
${URL}

You can create more interviews anytime on our website.

Best regards,
Team BOLOBOSS`
    );
    const to = interview?.userEmail;

    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      "_blank"
    );
  };

  return (
    <div className="p-5 rounded-lg bg-white w-full">
      <div className="flex items-center justify-between">
        {!viewDetail ? (
          <div className="rounded-full bg-blue-900 sm:w-6 sm:h-6 w-3 h-3"></div>
        ) : (
          <div className="rounded-full bg-gray-400 sm:w-6 sm:h-6 w-3 h-3"></div>
        )}
        <span className="sm:text-xs text-sm">
          {moment(interview?.created_at).format("DD MMM yyy")}
        </span>
      </div>
      <hr className="my-2 " />
      <div className="text-md sm:text-lg font-semibold capitalize">
        {interview?.jobPosition}
      </div>
      <div className="flex my-2 justify-between">
        <div className=" text-nowrap sm:text-md text-xs">
          {interview?.duration}
        </div>
        {!viewDetail ? (
          ""
        ) : (
          <span className="text-green-600 text-nowrap sm:text-md text-xs">
            {interview?.["feedback"]?.length + " "}Candidates
          </span>
        )}
      </div>
      <div className="flex justify-between flex-col sm:flex-row gap-2 mt-2">
        {!viewDetail ? (
          <>
            <Button
              className="w-full sm:w-auto flex items-center gap-2 justify-center"
              onClick={copyURL}
              variant="outline"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </Button>
            <Button
              className="w-full sm:w-auto flex items-center gap-2 justify-center"
              onClick={onSend}
            >
              <Send className="w-4 h-4" />
              Send Link
            </Button>
          </>
        ) : (
          <Link
            className="w-full"
            href={"/scheduled-interview/" + interview?.interviewID + "/details"}
          >
            <Button className="w-full" variant="outline">
              <Info className="w-4" /> View Details
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default InterviewCard;
