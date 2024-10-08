"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/lib/actions/users/updateUser";
import UserInfoCard from "./user-info-card";
import UpdatePasswordCard from "./update-password-card";
import UpdateActiveCard from "./update-active-card";
import DeleteCard from "./delete-card";
import { User, UserEditSubmit, UserFormErrors } from "../types";
import { useRouter } from "next/navigation";

export default function EditUserForm({ user }: { user: User }) {
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [optimisticUser, setOptimisticUser] = useState(user);
  const router = useRouter();

  const noFormErrors = {
    fields: null,
    detail: null,
  };
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
    const response = await updateUser(
      formData,
      content,
      optimisticUser.username
    );

    if (response?.errors) {
      setFormErrors((formErrors) => ({
        ...formErrors,
        ...response.errors,
      }));
    } else {
      setOptimisticUser(response.user!);
      setPasswordDialogOpen(false);

      toast({
        title: "Updated",
        description: `User ${content} successfully updated`,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    // Invalidate Router Cache to view updated user info
    router.refresh();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <UserInfoCard
        user={optimisticUser}
        formErrors={formErrors}
        handleSubmit={handleSubmit}
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

      <UpdateActiveCard
        user={optimisticUser}
        onActiveChange={() =>
          setOptimisticUser((user) => ({
            ...user,
            isActive: !user.isActive,
          }))
        }
      />

      <DeleteCard username={optimisticUser.username} />
    </div>
  );
}
