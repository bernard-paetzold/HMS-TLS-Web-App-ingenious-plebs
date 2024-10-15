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
import { useState } from "react";
import { User, UserEditSubmit, UserFormErrors } from "../types";

export default function EditUserInfoCard({
  user,
  formErrors,
  handleSubmit,
  isSameUser = false,
}: {
  user: User;
  formErrors: UserFormErrors;
  handleSubmit: UserEditSubmit;
  isSameUser?: boolean;
}) {
  const [role, setRole] = useState(user.role);
  const [isLoading, setIsLoading] = useState(false);
  const initRole = user.role;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update User</CardTitle>
        <CardDescription>
          Edit user with username {user.username}
        </CardDescription>
        {formErrors.detail && <FormError>{formErrors.detail}</FormError>}
      </CardHeader>
      <CardContent>
        <form
          onSubmit={async (e) => await handleSubmit(e, "info", setIsLoading)}
        >
          <div className="grid w-full items-center gap-4">
            {!isSameUser && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username">Username</Label>
                {formErrors.fields?.username && (
                  <FormError>{formErrors.fields?.username[0]}</FormError>
                )}
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder={user.username}
                />
              </div>
            )}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              {formErrors.fields?.firstName && (
                <FormError>{formErrors.fields?.firstName[0]}</FormError>
              )}
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder={user.firstName}
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
                placeholder={user.lastName}
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
                placeholder={user.email}
              />
            </div>
            {!isSameUser && (
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                {formErrors.fields?.role && (
                  <FormError>{formErrors.fields?.role[0]}</FormError>
                )}
                <input
                  type="hidden"
                  id="role"
                  name="role"
                  value={role !== initRole ? role : ""}
                />
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
            )}
            <Button type="submit" disabled={isLoading}>
              Update
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
