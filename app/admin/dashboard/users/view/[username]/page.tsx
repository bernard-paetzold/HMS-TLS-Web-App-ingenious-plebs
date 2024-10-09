import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
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

  const user = data.user;

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
            <li>Activated: {user.isActive ? "Yes" : "No"}</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="mr-2" asChild>
          <Link href={`/admin/dashboard/users/edit/${user.username}`}>
            Edit user
          </Link>
        </Button>
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
