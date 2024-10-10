import Fallback from "@/components/admin-dashboard/fallback/fallback";
import { columns } from "@/components/admin-dashboard/users/user-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getAllUsers } from "@/lib/actions/users/getAllUsers";
import { Suspense } from "react";

export default async function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>View all users</CardTitle>
        <CardDescription>Search for users</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Fallback />}>
          <UserTable />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function UserTable() {
  const data = await getAllUsers();

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
      data={data.users}
      filter={{ column: "username", placeholder: "Filter by username" }}
    />
  );
}
