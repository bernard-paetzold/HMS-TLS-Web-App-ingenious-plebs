import { AssignmentForm } from "@/components/assignments/assignmentForm";
import { getAssignmentById } from "@/lib/actions/assignmentRequest";
import { getLecturerModules } from "@/lib/actions/userRequests";
import { assignment } from "@/lib/definitions";

export default async function Page({ params }: { params: { id: number } }) {
  const modules = await getLecturerModules();
  const assignment: assignment | null = await getAssignmentById(params.id);

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Assignment</h1>
      <AssignmentForm
        modules={modules}
        assignment={assignment}
        isEditing={true}
      />
    </main>
  );
}
