import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllModules } from "@/lib/actions/modules/getAllModules";
import AssignModulesForm from "./assign-modules-form";
import { Suspense } from "react";

export default async function AssignModulesCard({
  username,
}: {
  username: string;
}) {
  const response = await getAllModules();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assign a Module</CardTitle>
        <CardDescription>Select the module to assign</CardDescription>
      </CardHeader>
      <CardContent>
        {response.errors && (
          <div className="flex flex-col gap-1">
            <p>Errors encountered</p>
            <p className="bg-neutral-50 border-l-4 shadow border-l-red-500 rounded-md p-4">
              {response.errors.detail}
            </p>
          </div>
        )}
        {response.modules && (
          <Suspense
            fallback={
              <div className="w-full h-10 bg-neutral-200 rounded-md animate-pulse"></div>
            }
          >
            <AssignModulesForm username={username} modules={response.modules} />
          </Suspense>
        )}
      </CardContent>
    </Card>
  );
}
