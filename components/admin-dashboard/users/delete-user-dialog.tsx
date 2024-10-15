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

import { deleteUser } from "@/lib/actions/users/deleteUser";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function DeleteUserDialog({ username }: { username: string }) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Delete user</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the user
            and remove any associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const response = await deleteUser(username);
              if (response.errors) {
                toast({
                  title: "An error occurred",
                  description: response.errors.detail,
                });
                return;
              }

              // toast & redirect user to view page if delete successful
              toast({
                title: "Deleted",
                description: "User successfully deleted",
              });
              router.push("/admin/dashboard/users/view");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
