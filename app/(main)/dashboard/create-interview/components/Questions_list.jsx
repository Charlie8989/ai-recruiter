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

const Questions_list = ({ formdata, onCreatelink, setuseQuestionList, questionlist }) => {
  const [loading, setLoading] = useState(false);
  const [saveLoading, setsaveLoading] = useState(false);
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
      router.push(`/interview/${interviewId}`); // ✅ redirect
    } else {
      toast("Failed to save interview");
    }
  };

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/ai-model/", { ...formdata });

      const cleaned = result.data.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const parsed = JSON.parse(cleaned);

      setuseQuestionList(parsed.interviewQuestions || []); // ✅ parent state
    } catch (err) {
      console.error("Error parsing AI response:", err);
      toast("Server or Parsing Error");
    } finally {
      setLoading(false);
    }
    onCreatelink({ interviewId });
  };

  return (
    <div
      className={`p-5 rounded-xl border flex flex-col gap-5 ${
        loading ? "bg-blue-100" : "bg-white"
      }`}
    >
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

      {questionlist?.length > 0 && (
        <div>
          <QuestionListContainer questionlist={questionlist} />
          <div className="flex justify-end mt5">
            <Button onClick={onFinish} disabled={saveLoading}>
              {saveLoading && <Loader2Icon className="animate-spin" />}
              Create Interview & Finish
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};


export default Questions_list;
