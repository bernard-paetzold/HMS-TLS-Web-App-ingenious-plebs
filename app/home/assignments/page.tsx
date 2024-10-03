import { assignment } from "@/lib/definitions";
import { assignmentRequest } from "@/lib/actions/assignmentRequest";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
} from "@nextui-org/react";

// Helper function to format dates
function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Assignment card component
function AssignmentCard({ assignment }: { assignment: assignment }) {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <Link
            className="text-xl font-bold mb-6"
            key={assignment.name}
            href={"/home/assignments/assignment"}
          >
            {assignment.name}
          </Link>
          <p className="text-sm">Closes: {formatDate(assignment.due_date)}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{assignment.assignment_info}</p>
      </CardBody>
      <Divider />
    </Card>
  );
}

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
