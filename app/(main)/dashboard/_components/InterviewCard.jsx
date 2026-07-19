import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Copy, Info, Send } from "lucide-react";
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
    <div className="flex min-h-[205px] w-full flex-col rounded-xl border border-[#cbd5e8] bg-[#f8fafc] p-4 shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[#2E318F]/35 hover:shadow-[0_16px_34px_rgba(46,49,143,0.14)]">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full ${
            viewDetail ? "bg-emerald-50 text-emerald-700" : "bg-[#eef2ff] text-[#2E318F]"
          }`}
        >
          <BriefcaseBusiness className="h-4 w-4" />
        </div>
        <span className="rounded-full bg-[#eef3fb] px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-[#cbd5e8]">
          {moment(interview?.created_at).format("DD MMM yyy")}
        </span>
      </div>
      <hr className="my-3 border-[#dfe5f2]" />
      <div className="min-h-12 text-base font-bold capitalize leading-snug text-gray-950">
        {interview?.jobPosition || "Untitled interview"}
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="rounded-md bg-[#eef3fb] px-3 py-1 text-sm font-semibold text-gray-700">
          {interview?.duration || "15-min"}
        </div>
        {!viewDetail ? (
          ""
        ) : (
          <span className="text-nowrap rounded-md bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
            {interview?.["feedback"]?.length + " "}Candidates
          </span>
        )}
      </div>
      <div className="mt-auto flex flex-col justify-between gap-2 pt-4 sm:flex-row">
        {!viewDetail ? (
          <>
            <Button
              className="h-10 w-full justify-center border-[#9aa8c1] bg-[#e7ecf5] font-semibold text-gray-950 shadow-sm hover:bg-[#dfe6f2] sm:w-auto"
              onClick={copyURL}
              variant="outline"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </Button>
            <Button
              className="h-10 w-full justify-center bg-[#2E318F] text-white hover:bg-[#242773] sm:w-auto"
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
