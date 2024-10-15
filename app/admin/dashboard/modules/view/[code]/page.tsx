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
import { getModuleAssignmentsAsAdmin } from "@/lib/actions/assignmentRequest";
import { Row } from "@/components/admin-dashboard/users/row";

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
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Module: {response.data.code}</CardTitle>
          <CardDescription>View module details</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Code: {response.data.code}</p>
        </CardContent>
        <CardFooter>
          <Button className="mr-2" asChild>
            <Link href={`/admin/dashboard/modules/edit/${response.data.code}`}>
              Edit module
            </Link>
          </Button>
        </CardFooter>
      </Card>
      <ModuleAssignments code={response.data.code} />
    </div>
  );
}

async function ModuleAssignments({ code }: { code: string }) {
  const assignments = await getModuleAssignmentsAsAdmin(code);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
        <CardDescription>Assignments for this module</CardDescription>
      </CardHeader>
      <CardContent>
        {assignments.length > 0 ? (
          <ul>
            {assignments.map((assignment, i) => (
              <Row key={assignment.id} noBorder={i === 0}>
                <Link
                  href={`/admin/dashboard/assignments/${assignment.id}`}
                  className="underline underline-offset-2"
                >
                  {assignment.name}
                </Link>
              </Row>
            ))}
          </ul>
        ) : (
          <p>No assignments</p>
        )}
      </CardContent>
    </Card>
  );
}
