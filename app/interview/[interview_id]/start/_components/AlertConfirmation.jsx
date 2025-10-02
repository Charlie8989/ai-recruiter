import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Vapi from "@vapi-ai/web";
import { toast } from "sonner";

const AlertConfirmation = ({ children, generateFeedback }) => {
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);

  

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>{children}</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Did You Want To End This Meeting?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This Action Can Not Be Undone.Your Meeting Will Be Disbanded.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => endInterview()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlertConfirmation;
