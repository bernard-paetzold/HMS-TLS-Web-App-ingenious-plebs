"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import UpdatePasswordCard from "./update-password-card";
import { User, UserEditSubmit, UserFormErrors } from "../types";
import { useRouter } from "next/navigation";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { updateOwnUser } from "@/lib/actions/users/updateOwnUser";
import EditUserInfoCard from "./edit-user-info-card";

type Data =
  | { user: User; errors?: never }
  | { user?: never; errors: { detail?: string } };

const noFormErrors = {
  fields: null,
  detail: null,
};

export default function EditOwnForm({ data }: { data: Data }) {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [optimisticUser, setOptimisticUser] = useState(data.user);
  const router = useRouter();
  const [formErrors, setFormErrors] = useState<UserFormErrors>(noFormErrors);
  const { toast } = useToast();

  function resetErrors() {
    setFormErrors(noFormErrors);
  }

  // multipurpose submit function
  const handleSubmit: UserEditSubmit = async (e, content, setIsLoading) => {
    // prevent page from reloading
    e.preventDefault();

    setIsLoading(true);
    setFormErrors(noFormErrors);

    const formData = new FormData(e.target);
    const response = await updateOwnUser(formData, content);

    if (response?.errors) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        ...response.errors,
      }));
    } else {
      setOptimisticUser(response.user);
      setPasswordDialogOpen(false);

      toast({
        title: "Updated",
        description: `Account successfully updated`,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // Invalidate Router Cache to view updated user info
    router.refresh();
  }, []);

  if (data.errors) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{data.errors.detail}</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href={"/"}>Take me back</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <EditUserInfoCard
        user={optimisticUser!}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        isSameUser
      />
      <UpdatePasswordCard
        formErrors={formErrors}
        handleSubmit={handleSubmit}
        open={passwordDialogOpen}
        onOpenChange={() => {
          resetErrors();
          setPasswordDialogOpen((open) => !open);
        }}
      />
    </div>
  );
}
