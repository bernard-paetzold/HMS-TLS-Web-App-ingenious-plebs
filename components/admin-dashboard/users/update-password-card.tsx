import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormError } from "@/components/ui/form-error";
import { useState } from "react";
import { UserEditSubmit, UserFormErrors } from "../types";
import PasswordTooltip from "./password-tooltip";

export default function UpdatePasswordCard({
  open,
  formErrors,
  handleSubmit,
  onOpenChange,
}: {
  open: boolean;
  formErrors: UserFormErrors;
  handleSubmit: UserEditSubmit;
  onOpenChange: VoidFunction;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogTrigger asChild>
            <Button>Set password</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form
              onSubmit={async (e) =>
                await handleSubmit(e, "password", setIsLoading)
              }
            >
              <DialogHeader>
                <DialogTitle>
                  Set new password{" "}
                  <PasswordTooltip className="ml-1" size={18} />
                </DialogTitle>
                <DialogDescription>
                  Udate the user&apos;s password here. Click save when
                  you&apos;re done.
                </DialogDescription>
                {formErrors.detail && (
                  <FormError>{formErrors.detail}</FormError>
                )}
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  {formErrors.fields?.password && (
                    <FormError className="text-right">
                      {formErrors.fields.password}
                    </FormError>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                      className="col-span-3"
                    />
                  </div>
                </div>
                <div>
                  {formErrors.fields?.passwordConfirm && (
                    <FormError className="text-right">
                      {formErrors.fields.passwordConfirm}
                    </FormError>
                  )}
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="passwordConfirm" className="text-right">
                      Confirm
                    </Label>

                    <Input
                      id="passwordConfirm"
                      name="passwordConfirm"
                      type="password"
                      required
                      className="col-span-3"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isLoading}>
                  Save changes
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
