import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ConfirmDeleteButton from "@/components/admin-dashboard/users/confirm-delete-button";
import Link from "next/link";

import { getOtherUser } from "@/lib/actions/users/getOtherUser";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  return (
    <Suspense fallback={<FallBack />}>
      <UserWrapper username={params.username} />
    </Suspense>
  );
}

// Display either error message or user's info
async function UserWrapper({ username }: { username: string }) {
  const data = await getOtherUser(username);

  if (data.errors) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{data.errors.detail}</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href={"/admin/dashboard/users/view"}>Take me back</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const user = data.user!;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Username: {username}</CardTitle>
        <CardDescription>View user&apos;s information</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border-l-4 border-blue-400 bg-neutral-50 p-2 shadow">
          <ul className="flex flex-col gap-1 text-lg">
            <li>ID: {user.id}</li>
            <li>Username: {user.username}</li>
            <li>First name: {user.firstName}</li>
            <li>Last name: {user.lastName}</li>
            <li>Email: {user.email}</li>
            <li>Role: {user.role}</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant={"outline"} className="mr-2" asChild>
          <Link href={`/admin/dashboard/users/edit/${user.username}`}>
            Edit
          </Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Remove</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                user and remove any associated data.
              </AlertDialogDescription>
              <Link
                href={`/admin/dashboard/users/edit/${user.username}?deactivate=true`}
                className="text-sm underline"
              >
                Deactivate user instead
              </Link>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <ConfirmDeleteButton username={user.username} />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}

function FallBack() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="rounded-md bg-neutral-200 py-4 mb-2"></div>
        <div className="rounded-md bg-neutral-200 py-4"></div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md bg-neutral-200 h-40"></div>
      </CardContent>
    </Card>
  );
}
