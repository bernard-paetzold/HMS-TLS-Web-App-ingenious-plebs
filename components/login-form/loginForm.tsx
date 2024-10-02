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

import { loginRequest } from "@/lib/actions/loginRequest";
import { BaseSyntheticEvent, useState } from "react";

type FormErrors = {
  fields: {
    username?: string[] | undefined;
    password?: string[] | undefined;
  } | null;
  credentials: string | null;
  other: string | null;
};

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const noFormErrors = {
    fields: null,
    credentials: null,
    other: null,
  };
  const [formErrors, setFormErrors] = useState<FormErrors>(noFormErrors);

  async function handleSubmit(e: BaseSyntheticEvent) {
    // prevent page from reloading
    e.preventDefault();

    setIsLoading(true);
    setFormErrors(noFormErrors);

    const formData = new FormData(e.target);
    const response = await loginRequest(formData);

    if (response?.errors) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        ...response.errors,
      }));
    }

    setIsLoading(false);
  }

  return (
    <Card className="max-w-[350px] w-full">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          {formErrors.credentials && (
            <span className="block text-red-500 mb-1">
              {formErrors.credentials}*
            </span>
          )}
          {formErrors.other && (
            <span className="block text-red-500 mb-1">{formErrors.other}*</span>
          )}
          Enter your username below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              {formErrors.fields?.username && (
                <span className="text-red-500">
                  {formErrors.fields?.username[0]}*
                </span>
              )}
              <Input
                id="username"
                name="username"
                type="text"
                required={true}
                placeholder="Adam"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              {formErrors.fields?.password && (
                <span className="text-red-500">
                  {formErrors.fields?.password[0]}*
                </span>
              )}
              <Input
                id="password"
                name="password"
                type="password"
                required={true}
                placeholder="password"
              />
            </div>
            <Button type="submit" disabled={isLoading}>
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
