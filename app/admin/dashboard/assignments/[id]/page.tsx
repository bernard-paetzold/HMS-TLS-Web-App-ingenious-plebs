import { assignment, submission } from "@/lib/definitions";
import { getAssignmentById } from "@/lib/actions/assignmentRequest";

import { getSubmissionByAssignmentId } from "@/lib/actions/submissionRequests";
import { SubmissionTable } from "@/components/submissions/submissionTable";
import LinkButton from "@/components/ui/link-button";
import DeleteAssignmentWithConfirmation from "@/components/ui/delete-assignment-confirmation";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function Page({ params }: { params: { id: number } }) {
  const assignment: assignment | null = await getAssignmentById(params.id);
  const submissions: submission[] = await getSubmissionByAssignmentId(
    params.id,
  );

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">{assignment.name}</h1>
      <div>
        <div>
          <p>Due Date: {formatDate(assignment.due_date)}</p>
          <p>Module: {assignment.subject}</p>
          <p>Created on: {formatDate(assignment.created_at)}</p>
          <p>Marks: {assignment.marks}</p>
        </div>
        <div className="comment">
          <p>{assignment.assignment_info}</p>
        </div>
        <div className="mt-4 space-x-4">
          <LinkButton
            title={"Edit"}
            target={`/home/assignments/edit/${params.id}`}
          ></LinkButton>
          <DeleteAssignmentWithConfirmation
            assignment={assignment}
          ></DeleteAssignmentWithConfirmation>
        </div>
        <div className="container mx-auto px-4 pt-10">
          <h1 className="text-2xl font-bold mb-6">Submissions</h1>
          <section id="submissions">
            <div className="flex flex-wrap gap-4 justify-center">
              <SubmissionTable submissions={submissions} admin={true} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
