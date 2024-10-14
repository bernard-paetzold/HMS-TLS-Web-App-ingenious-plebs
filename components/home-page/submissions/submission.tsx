"use server";

import { columns } from "@/components/home-page/submissions/submission-columns";
import { DataTable } from "@/components/ui/data-table-hidden";
import { submission } from "@/lib/definitions";

export async function SubmissionTable({
  submissions,
}: {
  submissions: submission[];
}) {
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
