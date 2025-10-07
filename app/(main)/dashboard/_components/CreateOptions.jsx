import { CameraIcon, Phone, PhoneCall, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

function CreateOptions() {
  return (
    <div className="w-full flex items-center">
      <Link href="/dashboard/create-interview" className="w-1/2 bg-white p-4 rounded-md ">
        <div className="bg-blue-200 w-fit p-3 rounded-md">
          <Video />
        </div>
        <p className="text-lg font-bold">Create new Interview</p>
        <p className="text-sm font-semibold">
          Create AI Interviews and schedule them with candidates
        </p>
      </Link>
    </div>
  );
}

export default CreateOptions;
