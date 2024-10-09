import { assignment } from "@/lib/definitions";
import { assignmentRequest } from "@/lib/actions/assignmentRequest";
import { AssignmentCard } from "@/components/home-page/cards";

export default async function Page() {
  const assignments: assignment[] = await assignmentRequest();

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Assignments</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {assignments && assignments.length > 0 ? (
          assignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))
        ) : (
          <p>No assignments available.</p>
        )}
      </div>
    </main>
  );
}
