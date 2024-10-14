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

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Module } from "../types";
import { deleteModule } from "@/lib/actions/modules/deleteModule";

export default function DeleteModuleDialog({ code }: Module) {
  const { toast } = useToast();
  const router = useRouter();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"destructive"}>Delete module</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            module and remove any associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const response = await deleteModule(code);
              if (response.errors) {
                toast({
                  title: "An error occured",
                  description: response.errors.detail,
                });
                return;
              }

              // toast & redirect user to view page if delete successful
              toast({
                title: "Deleted",
                description: "Module successfully deleted",
              });
              router.push("/admin/dashboard/modules/view");
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
