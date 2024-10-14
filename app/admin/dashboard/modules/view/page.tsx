import Fallback from "@/components/admin-dashboard/fallback/fallback";
import { columns } from "@/components/admin-dashboard/modules/module-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getAllModules } from "@/lib/actions/modules/getAllModules";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>View All Modules</CardTitle>
        <CardDescription>Search for modules</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Fallback />}>
          <ModuleTable />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function ModuleTable() {
  const data = await getAllModules();

  if (data.errors) {
    return (
      <div className="flex flex-col gap-1">
        <p>Errors encountered</p>
        <div className="bg-neutral-50 border-l-4 shadow border-l-red-500 rounded-md p-4">
          {data.errors.detail}
        </div>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data.modules}
      filter={{ column: "Code", placeholder: "Filter by code" }}
    />
  );
}
