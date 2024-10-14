import { AssignmentForm } from "@/components/assignments/assignmentForm";
import { getLecturerModules } from "@/lib/actions/userRequests";

export default async function Page() {
  const modules = await getLecturerModules();

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Create Assignment</h1>
      <AssignmentForm modules={modules} assignment={null} isEditing={false} />
    </main>
  );
}
