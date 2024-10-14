"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";

import { BaseSyntheticEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { createModule } from "@/lib/actions/modules/createModule";
import { ModuleFormErrors } from "@/components/admin-dashboard/types";

export default function AddUserForm() {
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
    const response = await createModule(formData);

    if (response?.errors) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        ...response.errors,
      }));
    } else {
      toast({
        title: "Created",
        description: "Module successfully created",
        action: (
          <ToastAction altText="View" asChild>
            <Link href={`/admin/dashboard/modules/view/${response.data.code}`}>
              View
            </Link>
          </ToastAction>
        ),
      });
    }

    setIsLoading(false);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Module</CardTitle>
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
                placeholder="CMPG323"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Add
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
