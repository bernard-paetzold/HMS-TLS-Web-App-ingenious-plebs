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
import { addLecturerToModule } from "@/lib/actions/modules/addLecturerToModule";

export default function LecturerCommandItem({
  lecturer,
  code,
}: {
  lecturer: DjangoUser;
  code: string;
}) {
  const { toast } = useToast();

  return (
    <CommandItem>
      <AlertDialog>
        <AlertDialogTrigger className="w-full text-left">
          {lecturer.username}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              Lecturer with username {lecturer.username} will now teach module{" "}
              {code}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                const response = await addLecturerToModule(lecturer.id, code);

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
