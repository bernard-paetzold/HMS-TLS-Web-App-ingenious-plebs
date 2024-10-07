"use client";

import { AlertDialogAction } from "@radix-ui/react-alert-dialog";
import { Button } from "@/components/ui/button";

import { deleteUser } from "@/lib/actions/users/deleteUser";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ConfirmDeleteButton({
  username,
}: {
  username: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <AlertDialogAction asChild>
      <Button
        onClick={async () => {
          const response = await deleteUser(username);
          if (response.errors) {
            toast({
              title: "An error occured",
              description: response.errors.detail,
            });
            return;
          }

          // redirect user to view page if delete successful
          router.push("/admin/dashboard/users/view");
        }}
      >
        Continue
      </Button>
    </AlertDialogAction>
  );
}
