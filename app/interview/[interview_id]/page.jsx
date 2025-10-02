"use client";
import { Clock, Info, List, Loader2Icon, Settings, Video } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import MicTestButton from "./_components/Microphone";

const page = () => {
  const { interview_id } = useParams();
  const [interviewData, setInterviewData] = useState();
  const [userName, setuserName] = useState();
  const [loading, setLoading] = useState(false);
  const { interviewInfo, setinterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  useEffect(() => {
    interview_id && getInterviewDetails();
  }, [interview_id]);

  const getInterviewDetails = async () => {
    setLoading(true);
    try {
      let { data: interview, error } = await supabase
        .from("interview")
        .select("jobPosition,duration,questionList")
        .eq("interviewID", interview_id);

      setInterviewData(interview[0]);

      if (interview?.length == 0) {
        toast("Incorrect Interview Link");
        setLoading(false);
        return;
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      toast("Incorrect Interview Link");
    } finally {
      setLoading(false);
    }
  };

  const onhandlechange = async (e) => {
    setuserName(e.target.value);
  };

  // console.log(userName)

  const adduserNametoDB = async () => {
    setLoading(true);
    const { data: interview, error } = await supabase
      .from("interview")
      .update({ name: userName })
      .eq("interviewID", interview_id)
      .select();

    setinterviewInfo(interview[0]);
    router.push("/interview/" + interview_id + "/start");
    setLoading(false);
  };

  //debbuging area
  // console.log(interview_id);
  // console.log(interviewData);

  return (
    <div className="p-3">
      <div className="w-full flex items-center justify-center">
        {loading && (
          <div className="w-full  flex justify-center items-center text-sm gap-2">
            <Loader2Icon className="w-8 text-blue-900 h-8 animate-spin" />
            Checking Your Interview Link
          </div>
        )}

        {!loading && (
          <div className="sm:w-2/3 my-5 w-full flex flex-col items-center bg-white rounded-md">
            <div className="flex flex-col justify-center items-center p-4">
              <span className="text-2xl font-bold text-black">BOLOBOSS</span>
              <span>AI-Powered Interview Platform</span>
            </div>
            <div className="my-8">
              <img
                src="/interviewpageillustration.svg"
                alt="illustration"
                width={200}
                height={200}
              />
            </div>
            <div className="flex w-full flex-col justify-center items-center">
              <span className="text-xl sm:text-2xl my-3 font-semibold capitalize">
                {interviewData?.jobPosition} Interview
              </span>
              <div className="flex gap-5 justify-center w-2/3 sm:w-1/2 px-3 mb-3">
                <span className="flex text-sm items-center gap-2">
                  <List className="w-3 capitalize" />
                  {interviewData?.questionList.length} Questions
                </span>
                <span className="flex text-sm items-center gap-2 capitalize">
                  <Clock className="w-3" />
                  {interviewData?.duration}
                </span>
              </div>
            </div>

            <div className="grid w-full max-w-sm items-center gap-3 sm:px-0 px-3">
              <Label htmlFor="email">Enter Your Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="John Smith"
                onChange={onhandlechange}
                className="capitalize p-6 mb-7 w-full"
              />
            </div>

            <div className="p-5 mb-7 w-9/10 sm:w-4/5 rounded-xl border flex flex-col gap-5 bg-blue-100">
              <div className="flex  items-center gap-3">
                <div>
                  <h2 className="text-blue-500 flex gap-3 items-center">
                    <Info className="w-4" />
                    Before You Begin
                  </h2>
                  <ul className="text-xs pl-8 text-blue-500">
                    <li className="list-disc">
                      Ensure you have stable internet connection
                    </li>
                    <li className="list-disc">
                      Test your camera and microphone
                    </li>
                    <li className="list-disc">
                      Find a quiet place for the interview
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex mb-7 justify-between gap-x-5">
              <MicTestButton />

              <div
                onClick={() => {
                  if (!userName) {
                    toast("Please Enter Your Name !");
                  } else if (userName.length < 3) {
                    toast("Name Is Too Short !");
                  } else {
                    adduserNametoDB();
                  }
                }}
              >
                <Button disabled={!userName || userName.length < 3}>
                  {!loading && <Video className="w-4" />}
                  {loading && <Loader2Icon className="w-4" />}
                  Join Interview
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
