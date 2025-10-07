import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import QuestionListContainer from "./QuestionListContainer";
import { supabase } from "@/services/supabaseClient";
import { useUser } from "@/app/provider";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const Questions_list = ({
  formdata,
  onCreatelink,
  setuseQuestionList,
  questionlist,
}) => {
  const [loading, setLoading] = useState(false);
  const [saveLoading, setsaveLoading] = useState(false);
  const [localQuestions, setLocalQuestions] = useState([]);
  const { user } = useUser();
  const router = useRouter();

  let interviewId = uuidv4();

  useEffect(() => {
    if (formdata) {
      generateQuestions();
    }
  }, [formdata]);

  const onFinish = async () => {
    setsaveLoading(true);
    const { data, error } = await supabase
      .from("interview")
      .insert({
        ...formdata,
        questionList: questionlist,
        userEmail: user?.email,
        interviewID: interviewId,
      })
      .select();

    setsaveLoading(false);

    if (!error) {
      onCreatelink({ interviewId });
      // router.push(`/interview/${interviewId}`);
    } else {
      toast("Failed to save interview");
    }
  };

  const generateQuestions = async () => {
    setLoading(true);
    
    try {
      const result = await axios.post("/api/ai-model/", { ...formdata });
      const rawContent = result.data.content;
      // console.log("Raw AI response:", rawContent);

      let cleaned = rawContent;
      if (typeof cleaned === "string") {
        cleaned = cleaned
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();
      }

      const parsed = JSON.parse(cleaned);
      const questions = parsed.interviewQuestions || [];

      setuseQuestionList(questions);
      setLocalQuestions(questions);

      // console.log("Generated Questions:", questions);

      // onCreatelink({ interviewId });
    } catch (err) {
      console.error("Error parsing AI response:", err?.response?.data || err.message || err);
      toast("Server Error, Come Back Later...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-5 rounded-xl border flex flex-col gap-5 ${
        loading ? "bg-blue-100" : "bg-white"
      }`}
    >
      {/* Step 1: Show loading */}
      {loading && (
        <div className="flex items-center gap-3">
          <Loader2Icon className="animate-spin" />
          <div>
            <h2 className="text-gray-900">Generating Questions</h2>
            <p className="text-xs text-gray-600">
              Our AI is crafting personalized questions based on your job
              position
            </p>
          </div>
        </div>
      )}

      {/* Step 2: Show questions after loading is done */}
      {!loading && localQuestions?.length > 0 && (
        <div>
          <QuestionListContainer questionlist={localQuestions} />

          <div className="flex sm:justify-end justify-center mt-5">
            <Button onClick={onFinish} disabled={saveLoading}>
              {saveLoading && <Loader2Icon className="animate-spin mr-2" />}
              {saveLoading ? "Saving..." : "Create Interview & Finish"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions_list;
