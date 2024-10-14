"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FormError } from "@/components/ui/form-error";
import { Label } from "@/components/ui/label";
import { ModuleFormErrors } from "../types";
import { Input } from "@/components/ui/input";
import { BaseSyntheticEvent, Dispatch, SetStateAction, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateModule } from "@/lib/actions/modules/updateModule";

export default function UpdateModuleCard({
  code,
  setCode,
}: {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const noFormErrors = {
    fields: null,
    detail: null,
  };
  const [formErrors, setFormErrors] = useState<ModuleFormErrors>(noFormErrors);

  const { toast } = useToast();

  async function handleSubmit(e: BaseSyntheticEvent) {
    // prevent page from reloading
    e.preventDefault();

    setIsLoading(true);
    setFormErrors(noFormErrors);

    const formData = new FormData(e.target);
    const response = await updateModule(formData, code);

    if (response?.errors) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        ...response.errors,
      }));
    } else {
      setCode(response.data.code);

      // No need to redirect to update URL
      window.history.replaceState(
        null,
        "",
        `/admin/dashboard/modules/edit/${response.data.code}`
      );

      toast({
        title: "Updated",
        description: `Module successfully updated`,
      });
    }

    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Module</CardTitle>
        <CardDescription>Enter the module code</CardDescription>
        {formErrors.detail && <FormError>{formErrors.detail}</FormError>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="code">Module Code</Label>
              {formErrors.fields?.code && (
                <FormError>{formErrors.fields?.code[0]}</FormError>
              )}
              <Input
                id="code"
                name="code"
                type="text"
                required={true}
                placeholder={code}
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Update
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
