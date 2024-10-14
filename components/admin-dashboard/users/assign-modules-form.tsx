"use client";

import { Label } from "@/components/ui/label";
import { BaseSyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";
import { useToast } from "@/hooks/use-toast";
import { addLecturerToModule } from "@/lib/actions/modules/addLecturerToModule";
import { addStudentToModule } from "@/lib/actions/modules/addStudentToModule";
import { getOtherUser } from "@/lib/actions/users/getOtherUser";
import { Combobox } from "@/components/ui/combobox";
import { Module } from "../types";
import { useRouter } from "next/navigation";

export default function AssignModulesForm({
  username,
  modules,
}: {
  username: string;
  modules: Module[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mod, setMod] = useState("");

  const noFormErrors = {
    fields: null,
    detail: null,
  };
  const [formErrors, setFormErrors] = useState<{ detail?: string | null }>(
    noFormErrors
  );
  const { toast } = useToast();

  const content = modules.map((mod) => ({
    value: mod.code,
    label: mod.code,
  }));

  async function handleSubmit(e: BaseSyntheticEvent) {
    // prevent page from reloading
    e.preventDefault();

    setIsLoading(true);
    setFormErrors(noFormErrors);

    // Get user info to check role
    const userResponse = await getOtherUser(username);

    if (userResponse.errors) {
      setFormErrors({
        detail: userResponse.errors.detail,
      });
      setIsLoading(false);
      return;
    }

    const user = userResponse.user;

    // Add user to module
    const moduleResponse = await (user.role === "student"
      ? addStudentToModule(user.username, mod)
      : addLecturerToModule(user.id, mod));

    if (moduleResponse.errors) {
      setFormErrors({
        detail:
          moduleResponse.errors.detail || "Invalid username/id or module code",
      });
    } else {
      toast({
        title: "Success",
        description: moduleResponse.detail,
      });
      router.refresh();
    }

    setIsLoading(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="code">Module Code</Label>
          {formErrors.detail && <FormError>{formErrors.detail}</FormError>}

          <Combobox
            content={content}
            contentType="Module"
            value={mod}
            setValue={setMod}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          Assign module
        </Button>
      </div>
    </form>
  );
}
