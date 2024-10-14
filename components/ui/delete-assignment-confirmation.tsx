"use client";

import { useState } from "react";
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
import { deleteAssignment } from "@/lib/actions/assignmentRequest";
import { assignment } from "@/lib/definitions";
import { useRouter } from "next/navigation";

interface DeleteAssignmentWithConfirmationProps {
  assignment: assignment | null;
}

export default function DeleteAssignmentWithConfirmation({
  assignment: assignment,
}: DeleteAssignmentWithConfirmationProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!assignment) {
    return "";
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            assignment and all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteAssignment(assignment);
              setOpen(false);
              router.push("/home/assignments");
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
