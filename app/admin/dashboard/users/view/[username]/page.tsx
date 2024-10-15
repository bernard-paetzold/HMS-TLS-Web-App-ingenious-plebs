import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";

import { getOtherUser } from "@/lib/actions/users/getOtherUser";
import { Suspense } from "react";
import Fallback from "@/components/admin-dashboard/fallback/fallback";
import { UserModules } from "@/components/admin-dashboard/users/user-modules";
import { UserAssignments } from "@/components/admin-dashboard/users/user-assignments";
import { UserSubmissions } from "@/components/admin-dashboard/users/user-submissions";
import { UserInfo } from "@/components/admin-dashboard/users/user-info";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  return (
    <Suspense fallback={<Fallback />}>
      <UserWrapper username={params.username} />
    </Suspense>
  );
}

// Display either error message or user's info
async function UserWrapper({ username }: { username: string }) {
  const response = await getOtherUser(username);

  if (response.errors) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{response.errors.detail}</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href={"/admin/dashboard/users/view"}>Take me back</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <UserInfo username={username} user={response.user} />
      <UserModules username={username} />
      {response.user.role === "lecturer" && (
        <UserAssignments username={username} />
      )}
      {response.user.role === "student" && (
        <UserSubmissions userID={response.user.id} />
      )}
    </div>
  );
}
