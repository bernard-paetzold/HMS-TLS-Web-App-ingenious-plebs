"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

import { CommandItem } from "@/components/ui/command";
import { DjangoUser } from "../types";
import { useToast } from "@/hooks/use-toast";
import { addStudentToModule } from "@/lib/actions/modules/addStudentToModule";

export default function StudentCommandItem({
  student,
  code,
}: {
  student: DjangoUser;
  code: string;
}) {
  const { toast } = useToast();

  return (
    <CommandItem>
      <AlertDialog>
        <AlertDialogTrigger className="w-full text-left">
          {student.username}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Student with username {student.username} will now receive module{" "}
              {code}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const response = await addStudentToModule(
                  student.username,
                  code
                );

                if (response.errors) {
                  toast({
                    title: "An error occurred",
                    description: response.errors.detail,
                  });
                  return;
                }

                toast({
                  title: "Success",
                  description: response.detail,
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </CommandItem>
  );
}
