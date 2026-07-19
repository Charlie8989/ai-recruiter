import { Button } from "@/components/ui/button";
import { BriefcaseBusiness, Copy, Eye, Loader2, Send, Trash2 } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";

function InterviewCard({
  interview,
  viewDetail = false,
  onDeleted,
  compact = false,
}) {
  const [deleting, setDeleting] = useState(false);
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

  const onDelete = async () => {
    const confirmed = window.confirm(
      "Delete this interview and all related feedback?"
    );

    if (!confirmed) return;

    setDeleting(true);
    try {
      const response = await fetch(
        `/api/interviews/${interview?.interviewID}?email=${encodeURIComponent(
          interview?.userEmail || ""
        )}`,
        { method: "DELETE" }
      );

      if (!response.ok) {
        throw new Error(await response.text());
      }

      toast("Interview deleted");
      onDeleted?.(interview?.interviewID);
    } catch (error) {
      toast("Could not delete interview");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div
      className={`flex w-full flex-col rounded-xl border border-[#cbd5e8] bg-[#f8fafc] shadow-[0_10px_24px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[#2E318F]/35 hover:shadow-[0_16px_34px_rgba(46,49,143,0.14)] ${
        compact ? "min-h-[170px] p-3" : "min-h-[205px] p-4"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center justify-center rounded-full ${
              viewDetail ? "bg-emerald-50 text-emerald-700" : "bg-[#eef2ff] text-[#2E318F]"
            } ${compact ? "h-8 w-8" : "h-9 w-9"}`}
          >
            <BriefcaseBusiness className="h-4 w-4" />
          </div>
          <button
            type="button"
            title="Delete interview"
            aria-label="Delete interview"
            onClick={onDelete}
            disabled={deleting}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-gray-400 transition hover:border-[#f0b4b4] hover:bg-[#fff1f1] hover:text-[#b42323] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deleting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </button>
        </div>
        <span className="rounded-full bg-[#eef3fb] px-3 py-1 text-xs font-semibold text-gray-700 ring-1 ring-[#cbd5e8]">
          {moment(interview?.created_at).format("DD MMM yyy")}
        </span>
      </div>
      <hr className={`${compact ? "my-2" : "my-3"} border-[#dfe5f2]`} />
      <div
        className={`font-bold capitalize leading-snug text-gray-950 ${
          compact ? "min-h-8 text-sm" : "min-h-12 text-base"
        }`}
      >
        {interview?.jobPosition || "Untitled interview"}
      </div>
      <div className={`${compact ? "mt-1" : "mt-2"} flex items-center justify-between`}>
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
      <div
        className={`mt-auto grid grid-cols-1 gap-2 ${
          viewDetail ? "" : "sm:grid-cols-2"
        } ${compact ? "pt-3" : "pt-4"}`}
      >
        {!viewDetail ? (
          <>
            <Button
              className={`${compact ? "h-9 text-sm" : "h-10"} w-full justify-center border-[#9aa8c1] bg-[#e7ecf5] font-semibold text-gray-950 shadow-sm hover:bg-[#dfe6f2]`}
              onClick={copyURL}
              variant="outline"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </Button>
            <Button
              className={`${compact ? "h-9 text-sm" : "h-10"} w-full justify-center bg-[#2E318F] text-white hover:bg-[#242773]`}
              onClick={onSend}
            >
              <Send className="w-4 h-4" />
              Send Link
            </Button>
          </>
        ) : (
          <>
            <Link
              className="w-full"
              href={"/scheduled-interview/" + interview?.interviewID + "/details"}
            >
              <Button className={`${compact ? "h-9 text-sm" : "h-10"} w-full bg-[#2E318F] text-white shadow-sm hover:bg-[#242773]`}>
                <Eye className="w-4 h-4" /> View Feedback
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default InterviewCard;
