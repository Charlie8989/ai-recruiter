import { Button } from "@/components/ui/button";
import { Camera, CopyIcon, Send, Video } from "lucide-react";
import Link from "next/link";
import React from "react";

const PreviousCreated = () => {
  return (
    <div>
      <Link href="/dashboard/create-interview" className="w-full h-40 gap-y-2 flex flex-col justify-center items-center bg-white border-1 border-black border-dashed rounded-md text-center">
        <div className="w-full flex justify-center">
          <Video/>
        </div>
        <p>You Don't Have Any Interview Created !</p>
        <Button className="w-1/2" >+ Create New Interview</Button>
      </Link>
    </div>
  );
};

export default PreviousCreated;
