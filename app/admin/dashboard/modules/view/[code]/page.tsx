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

import { getModule } from "@/lib/actions/modules/getModule";
import { Suspense } from "react";
import Fallback from "@/components/admin-dashboard/fallback/fallback";

export default async function Page({ params }: { params: { code: string } }) {
  return (
    <Suspense fallback={<Fallback />}>
      <ModuleWrapper code={params.code} />
    </Suspense>
  );
}

// Display either error message or module info
async function ModuleWrapper({ code }: { code: string }) {
  const response = await getModule(code);

  if (response.errors) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{response.errors.detail}</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href={"/admin/dashboard/modules/view"}>Take me back</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Module: {response.data.code}</CardTitle>
        <CardDescription>View module details</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border-l-4 border-blue-400 bg-neutral-50 p-2 shadow">
          <p>Code: {response.data.code}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="mr-2" asChild>
          <Link href={`/admin/dashboard/modules/edit/${response.data.code}`}>
            Edit module
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
