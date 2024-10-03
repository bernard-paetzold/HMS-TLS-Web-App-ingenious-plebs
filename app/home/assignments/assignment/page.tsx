import { assignment } from "@/lib/definitions";
import { assignmentRequest } from "@/lib/actions/assignmentRequest";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function Page() {
  const assignments: assignment[] = await assignmentRequest();

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Assignments</h1>
    </main>
  );
}
