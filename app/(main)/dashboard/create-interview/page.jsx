"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Form_container from "./components/Form_container";
import Questions_list from "./components/Questions_list";
import { toast } from "sonner";
import InterviewLink from "./components/InterviewLink";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";

function CreateInterview() {
  const router = useRouter();
  const { user } = useUser();
  const [usercredits, setCredits] = useState();
  const [step, setStep] = useState(1);
  const [InterviewId, setInterviewId] = useState();
  const [usequestionlist, setuseQuestionList] = useState([]);
  const [formdata, setFormdata] = useState({});

  //formadata yahan se aa rha
  const onhandleInputChange = (field, value) => {
    setFormdata((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    getuserDetails();
  }, [user]);

  const getuserDetails = async () => {
    const { data: Users, error } = await supabase
      .from("Users")
      .select("credits")
      .eq("email", user?.email)
      .single();
    if (error) console.error(error);
    else setCredits(Users?.credits);
  };

  const ongotoNext = () => {
    if (usercredits <= 0) {
      toast(" Limit Exceeded");
    } else {
      if (Object.keys(formdata).length < 3) {
        toast("Please fill at least 3 fields before continuing.");
        return;
      }
      toast("Event has been created.");
      setStep(step + 1);
    }
  };

  const onCreatelink = (interviewId) => {
    setInterviewId(interviewId);
    setStep(step + 1);
  };

  return (
    <div className="w-full mt-10 px-10 py-7 md:px-24 lg:px-44 xl:px-56 bg-white rounded-md">
      <div className="flex w-full gap-4">
        <button
          onClick={() => router.back()}
          type="button"
          className="flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 cursor-pointer" />
        </button>
        <h2 className="font-semibold text-2xl">Create An Interview</h2>
      </div>
      <Progress value={step * 33.33} className="my-4" />
      {step == 1 ? (
        <Form_container
          onhandleInputChange={onhandleInputChange}
          gotoNext={() => ongotoNext()}
        />
      ) : step == 2 ? (
        <Questions_list
          formdata={formdata}
          onCreatelink={(interviewId) => onCreatelink(interviewId)}
          setuseQuestionList={setuseQuestionList}
          questionlist={usequestionlist}
        />
      ) : step == 3 ? (
        <InterviewLink
          usequestionlist={usequestionlist}
          interviewId={InterviewId}
          formdata={formdata}
        />
      ) : null}
    </div>
  );
}

export default CreateInterview;
