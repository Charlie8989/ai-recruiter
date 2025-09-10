"use client";
import React, { useEffect, useState } from "react";
import { Briefcase, Code, PuzzleIcon, User, Users } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const Form_container = ({ onhandleInputChange,gotoNext }) => {
  const [active, setActive] = useState([]);
  const [interviewtype, setInterviewType] = useState([]);

  //chatgpt ka hai
  const toggleType = (type, label) => {
    setActive((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
    setInterviewType((prev) =>
      prev.includes(label) ? prev.filter((t) => t !== label) : [...prev, label]
    );
  };

  useEffect(() => {
    onhandleInputChange("type", interviewtype); // will now be an array
  }, [interviewtype]);

  return (
    <div className="w-full">
      <form className="flex-col flex">
        {/* Job Position */}
        <div className="my-3">
          <p className="text-sm mb-3">Job Position</p>
          <input
            type="text"
            placeholder="e.g. John Smith"
            className="p-4 bg-white w-full text-gray-500 rounded-md border border-black/40 outline-none"
            required
            onChange={(e) => {
              onhandleInputChange("jobPosition", e.target.value);
            }}
          />
        </div>

        {/* Job Description */}
        <div className="my-3">
          <p className="text-sm mb-3">Job Description</p>
          <textarea
            placeholder="Enter Detailed Job description..."
            className="p-4 bg-white w-full text-gray-500 rounded-md border border-black/40 outline-none"
            onChange={(e) => {
              onhandleInputChange("jobDescription", e.target.value);
            }}
          />
        </div>

        {/* Interview Duration */}
        <div className="my-3">
          <p className="text-sm mb-3">Select Interview Duration</p>
          <Select
            onValueChange={(value) => {
              onhandleInputChange("duration", value);
            }}
          >
            <SelectTrigger className="p-4 bg-white w-full text-gray-500 rounded-md border border-black/40 outline-none">
              <SelectValue placeholder="Select Duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15-min">15 minute</SelectItem>
              <SelectItem value="30-min">30 Minute</SelectItem>
              <SelectItem value="45-min">45 Minute</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Interview Types */}
        <div className="my-3">
          <p className="text-sm mb-3">Interview Types</p>
          <div className="w-full gap-3 flex flex-row flex-wrap">
            <span
              onClick={() => toggleType("technical", "Technical")}
              className={`rounded-full gap-1 flex items-center border px-3 py-2 cursor-pointer transition
                ${
                  active.includes("technical")
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-black border-black"
                }
              `}
            >
              <Code className="w-4" />
              Technical
            </span>

            <span
              onClick={() => toggleType("behavioral", "Behavioral")}
              className={`rounded-full gap-1 flex items-center border px-3 py-2 cursor-pointer transition
                ${
                  active.includes("behavioral")
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-black border-black"
                }
              `}
            >
              <User className="w-4" />
              Behavioral
            </span>

            <span
              onClick={() => toggleType("experience", "Experience")}
              className={`rounded-full gap-1 flex items-center border px-3 py-2 cursor-pointer transition
                ${
                  active.includes("experience")
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-black border-black"
                }
              `}
            >
              <Briefcase className="w-4" />
              Experience
            </span>

            <span
              onClick={() => toggleType("solving", "Problem-solving")}
              className={`rounded-full gap-1 flex items-center border px-3 py-2 cursor-pointer transition
                ${
                  active.includes("solving")
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-black border-black"
                }
              `}
            >
              <PuzzleIcon className="w-4" />
              Problem-Solving
            </span>

            <span
              onClick={() => toggleType("leadership", "Leadership")}
              className={`rounded-full gap-1 flex items-center border px-3 py-2 cursor-pointer transition
                ${
                  active.includes("leadership")
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-black border-black"
                }
              `}
            >
              <Users className="w-4" />
              Leadership
            </span>
          </div>
        </div>
      </form>
      <div className="w-full flex justify-between px-3 mt-5">
        <Button className="bg-transparent border border-black/30 text-black hover:bg-transparent">
          Cancel
        </Button>
        <Button onClick={()=>gotoNext()}>Generate Questions ⟶</Button>
      </div>
    </div>
  );
};

export default Form_container;
