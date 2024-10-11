import { columns } from "@/components/home-page/assignments/assignment-columns";
import { DataTable } from "@/components/ui/data-table";
import { assignment } from "@/lib/definitions";

export async function AssignmentTable({
  assignments,
}: {
  assignments: assignment[];
}) {
  return (
    <DataTable
      columns={columns}
      data={assignments}
      filter={{ column: "subject", placeholder: "Filter by module" }}
    />
  );
}
