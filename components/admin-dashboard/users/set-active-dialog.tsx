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
import { Button } from "@/components/ui/button";

import { useToast } from "@/hooks/use-toast";
import { setActive } from "@/lib/actions/users/setActive";

export default function SetActiveDialog({
  username,
  isActive,
  onActiveChange,
}: {
  username: string;
  isActive: boolean;
  onActiveChange: VoidFunction;
}) {
  const { toast } = useToast();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>{isActive ? "Deactivate" : "Activate"} user</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {isActive
              ? "This user won't be able to perform any operations."
              : "This user will be able to perform operations again."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const response = await setActive(username, !isActive);
              if (response.errors) {
                toast({
                  title: "An error occurred",
                  description: response.errors.detail,
                });
                return;
              }

              onActiveChange();
              toast({
                title: !isActive ? "Activated" : "Deactivated",
                description: `User successfully ${
                  !isActive ? "activated" : "deactivated"
                }`,
              });
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
