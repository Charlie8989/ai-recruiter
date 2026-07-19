import { ArrowRight, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

function CreateOptions() {
  return (
    <div className="w-full flex items-center">
      <Link
        href="/dashboard/create-interview"
        className="group w-full max-w-3xl rounded-xl border border-[#cbd5e8] bg-[#f8fafc] p-6 shadow-[0_12px_32px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:border-[#2E318F]/40 hover:shadow-[0_18px_45px_rgba(46,49,143,0.16)]"
      >
        <div className="flex items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-[#dbeafe] text-[#2E318F] ring-1 ring-[#bfdbfe]">
              <Video className="h-7 w-7" />
            </div>
            <div>
              <p className="text-xl font-bold text-gray-950">
                Create new Interview
              </p>
              <p className="mt-1 text-sm font-medium text-gray-600">
                Generate AI questions, create a shareable link, and collect feedback.
              </p>
            </div>
          </div>
          <div className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#2E318F] text-white transition group-hover:translate-x-1 sm:flex">
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CreateOptions;
