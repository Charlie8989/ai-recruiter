"use client";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Form_container from "./components/Form_container";
import Questions_list from "./components/Questions_list";

function CreateInterview() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const [formdata, setFormdata] = useState();
  const onhandleInputChange = (field, value) => {
    setFormdata((prev) => ({ ...prev, [field]: value }));
  };

  console.log(formdata);

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
          gotoNext={() => setStep(step + 1)}
        />
      ) : step == 2 ? (
        <Questions_list />
      ) : null}
    </div>
  );
}

export default CreateInterview;
