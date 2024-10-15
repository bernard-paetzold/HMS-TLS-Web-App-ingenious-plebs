"use client";

import { useCallback, useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { assignment, feedback } from "@/lib/definitions";
import { Download } from "lucide-react";
import { getFeedbackByAssignmentId } from "@/lib/actions/feedbackRequests";
import { utils, writeFileXLSX } from "xlsx";

interface DownloadCSVButton {
  assignment: assignment | null;
}

export default function DownloadCSVButton({
  assignment: assignment,
}: DownloadCSVButton) {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<feedback[]>([]);

  const fetchFeedback = useCallback(async () => {
    if (assignment?.id) {
      const assignmentFeedback = await getFeedbackByAssignmentId(assignment.id);
      setFeedback(assignmentFeedback);
    }
  }, [assignment]);

  useEffect(() => {
    if (open) {
      fetchFeedback();
    }
  }, [open, fetchFeedback]);

  const exportFile = useCallback(() => {
    if (assignment) {
      const ws = utils.json_to_sheet(feedback);
      const wb = utils.book_new();
      utils.book_append_sheet(wb, ws, "Feedback");
      writeFileXLSX(wb, `${assignment?.name ?? "invalid"}.xlsx`);
    }
  }, [feedback]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Download className="mr-2 h-4 w-4" />
          XLSX
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Download</AlertDialogTitle>
          <AlertDialogDescription>
            Download XLSX of feedback and marks for this assignment.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={exportFile}>
            Export XLSX
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
