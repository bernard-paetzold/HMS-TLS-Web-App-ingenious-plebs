import { assignment } from "@/lib/definitions";
import { assignmentRequest } from "@/lib/actions/assignmentRequest";
import { AssignmentTable } from "@/components/home-page/assignments/assignment";

export default async function Page() {
  const assignments: assignment[] = await assignmentRequest();

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">My Assignments</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        <AssignmentTable assignments={assignments} />
      </div>
    </main>
  );
}
