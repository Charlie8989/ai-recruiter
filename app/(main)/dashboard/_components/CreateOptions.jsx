import { CameraIcon, Phone, PhoneCall, Video } from "lucide-react";
import React from "react";

function CreateOptions() {
  return (
    <div className="w-full flex justify-around items-center">
      <div className="w-[40%] bg-white p-4 rounded-md">
        <div className="bg-blue-200 w-fit p-3 rounded-md">
          <Video />
        </div>
        <p className="text-lg font-bold">Create new Interview</p>
        <p className="text-sm font-semibold">
          Create AI Interviews and schedule them with candidates
        </p>
      </div>
      <div className="w-[50%] bg-white p-4 rounded-md">
        <div className="bg-blue-200 w-fit p-3 rounded-md">
          <Phone />
        </div>
        <p className="text-lg font-bold">Create Phone Screening Call</p>
        <p className="text-sm font-semibold">
          Schedule phone Screening calls with ppotential candidates
        </p>
      </div>
    </div>
  );
}

export default CreateOptions;
