import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

import { getOtherUser } from "@/lib/actions/users/getOtherUser";
import { Suspense } from "react";
import EditUserForm from "@/components/admin-dashboard/users/edit-user-form";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  return (
    <Suspense fallback={<FallBack />}>
      <EditFormWrapper username={params.username} />
    </Suspense>
  );
}

// Display either error message or form prefilled with user's data
async function EditFormWrapper({ username }: { username: string }) {
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

  return <EditUserForm user={user} />;
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
