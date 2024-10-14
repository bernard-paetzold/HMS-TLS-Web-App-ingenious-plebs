"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";

import { createUser } from "@/lib/actions/users/createUser";
import { BaseSyntheticEvent, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import PasswordTooltip from "./password-tooltip";

type FormErrors = {
  fields: {
    username?: string[] | undefined;
    firstName?: string[] | undefined;
    lastName?: string[] | undefined;
    email?: string[] | undefined;
    role?: string[] | undefined;
    password?: string[] | undefined;
  } | null;
  detail: string | null;
};

export default function AddUserForm() {
  const [isLoading, setIsLoading] = useState(false);
  const noFormErrors = {
    fields: null,
    detail: null,
  };
  const [formErrors, setFormErrors] = useState<FormErrors>(noFormErrors);
  const [role, setRole] = useState("");
  const { toast } = useToast();

  async function handleSubmit(e: BaseSyntheticEvent) {
    // prevent page from reloading
    e.preventDefault();

    setIsLoading(true);
    setFormErrors(noFormErrors);

    const formData = new FormData(e.target);
    formData.append("role", role);
    const response = await createUser(formData);

    if (response?.errors) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        ...response.errors,
      }));
    } else {
      toast({
        title: "Created",
        description: "User successfully created",
        action: (
          <ToastAction altText="View" asChild>
            <Link
              href={`/admin/dashboard/users/view/${response.user?.username}`}
            >
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
        <CardTitle>Add a User</CardTitle>
        <CardDescription>Enter the required details</CardDescription>
        {formErrors.detail && <FormError>{formErrors.detail}</FormError>}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              {formErrors.fields?.username && (
                <FormError>{formErrors.fields?.username[0]}</FormError>
              )}
              <Input
                id="username"
                name="username"
                type="text"
                required={true}
                placeholder="14343826"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              {formErrors.fields?.firstName && (
                <FormError>{formErrors.fields?.firstName[0]}</FormError>
              )}
              <Input
                id="firstName"
                name="firstName"
                type="text"
                required={true}
                placeholder="Adam"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              {formErrors.fields?.lastName && (
                <FormError>{formErrors.fields?.lastName[0]}</FormError>
              )}
              <Input
                id="lastName"
                name="lastName"
                type="text"
                required={true}
                placeholder="Sandles"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              {formErrors.fields?.email && (
                <FormError>{formErrors.fields?.email[0]}</FormError>
              )}
              <Input
                id="email"
                name="email"
                type="email"
                required={true}
                placeholder="adam@example.com"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">
                Password <PasswordTooltip />
              </Label>
              {formErrors.fields?.password && (
                <FormError>{formErrors.fields?.password[0]}</FormError>
              )}
              <Input
                id="password"
                name="password"
                type="password"
                required={true}
                placeholder="example password"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Role</Label>
              {formErrors.fields?.role && (
                <FormError>{formErrors.fields?.role[0]}</FormError>
              )}
              <Combobox
                content={[
                  {
                    value: "student",
                    label: "Student",
                  },
                  {
                    value: "lecturer",
                    label: "Lecturer",
                  },
                ]}
                contentType="role"
                value={role}
                setValue={setRole}
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
