"use server";

import { columns } from "@/components/home-page/assignments/assignment-columns";
import { DataTable } from "@/components/ui/data-table-hidden";
import { assignment } from "@/lib/definitions";

export async function AssignmentTable({
  assignments,
}: {
  assignments: assignment[];
}) {
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
