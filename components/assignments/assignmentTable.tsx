"use server";

import {
  userColumns,
  adminColumns,
} from "@/components/assignments/assignment-columns";
import { DataTable } from "@/components/ui/data-table-hidden";
import { assignment } from "@/lib/definitions";

export async function AssignmentTable({
  assignments,
  admin,
}: {
  assignments: assignment[];
  admin: boolean;
}) {
  const columns = admin ? adminColumns : userColumns;

  const TableComponent = () => {
    const table = (
      <DataTable
        columns={columns}
        data={assignments}
        filter={{ column: "subject", placeholder: "Filter by module" }}
        visibility={["id"]}
      />
    );

    return table;
  };

  return <TableComponent />;
}
