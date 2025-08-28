import { CopyIcon, Send } from "lucide-react";
import React from "react";

const PreviousCreated = () => {
  return (
    <div>
      <div className="w-full flex gap-2 items-center">
        <div className="w-[40%] bg-white p-4 rounded-md">
          <div className="bg-blue-200 w-fit p-3 rounded-md">
            <img src="/google.png" className="w-4 h-4" alt="" />
          </div>
          <p className="text-md font-bold my-1">Full Stack Developer</p>
          <p className="text-sm font-semibold mb-2">30 Min</p>
          <div className="flex justify-between gap-2">
            <div
              className="flex justify-center gap-2 items-center w-1/2 px-4 py-2 border  rounded-md
          "
            >
              <CopyIcon className="w-4" />
              <p className="font-bold text-sm">Copy Link</p>
            </div>
            <div
              className="flex gap-2 justify-center items-center w-1/2 px-4 py-2 bg-blue-200  rounded-md text-black
          "
            >
              <Send className="w-4" />
              <p className="font-bold text-sm">Send</p>
            </div>
          </div>
        </div>
          <div className="w-[40%] bg-white p-4 rounded-md">
          <div className="bg-blue-200 w-fit p-3 rounded-md">
            <img src="/google.png" className="w-4 h-4" alt="" />
          </div>
          <p className="text-md font-bold my-1">Full Stack Developer</p>
          <p className="text-sm font-semibold mb-2">30 Min</p>
          <div className="flex justify-between gap-2">
            <div
              className="flex justify-center gap-2 items-center w-1/2 px-4 py-2 border  rounded-md
          "
            >
              <CopyIcon className="w-4" />
              <p className="font-bold text-sm">Copy Link</p>
            </div>
            <div
              className="flex gap-2 justify-center items-center w-1/2 px-4 py-2 bg-blue-200  rounded-md text-black
          "
            >
              <Send className="w-4" />
              <p className="font-bold text-sm">Send</p>
            </div>
          </div>
        </div>
          <div className="w-[40%] bg-white p-4 rounded-md">
          <div className="bg-blue-200 w-fit p-3 rounded-md">
            <img src="/google.png" className="w-4 h-4" alt="" />
          </div>
          <p className="text-md font-bold my-1">Full Stack Developer</p>
          <p className="text-sm font-semibold mb-2">30 Min</p>
          <div className="flex justify-between gap-2">
            <div
              className="flex justify-center gap-2 items-center w-1/2 px-4 py-2 border  rounded-md
          "
            >
              <CopyIcon className="w-4" />
              <p className="font-bold text-sm">Copy Link</p>
            </div>
            <div
              className="flex gap-2 justify-center items-center w-1/2 px-4 py-2 bg-blue-200  rounded-md text-black
          "
            >
              <Send className="w-4" />
              <p className="font-bold text-sm">Send</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousCreated;
