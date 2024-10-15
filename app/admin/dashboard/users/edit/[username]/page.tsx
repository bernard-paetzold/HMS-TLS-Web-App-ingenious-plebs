import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";

import { getOtherUser } from "@/lib/actions/users/getOtherUser";
import { Suspense } from "react";
import EditUserForm from "@/components/admin-dashboard/users/edit-user-form";
import Fallback from "@/components/admin-dashboard/fallback/fallback";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  return (
    <Suspense fallback={<Fallback />}>
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

  return <EditUserForm user={data.user} />;
}
