"use server";

import {
  userColumns,
  adminColumns,
} from "@/components/submissions/submission-columns";
import { DataTable } from "@/components/ui/data-table-hidden";
import { submission } from "@/lib/definitions";

export async function SubmissionTable({
  submissions,
  admin,
}: {
  submissions: submission[];
  admin: boolean;
}) {
  const columns = admin ? adminColumns : userColumns;

  const TableComponent = () => {
    const table = (
      <DataTable
        columns={columns}
        data={submissions}
        filter={{ column: "user", placeholder: "Filter by student" }}
        visibility={["id"]}
      />
    );

    return table;
  };

  return <TableComponent />;
}
