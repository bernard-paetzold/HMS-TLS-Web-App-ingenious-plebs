import { assignment, submission } from "@/lib/definitions";
import { getAssignmentById } from "@/lib/actions/assignmentRequest";

import { getSubmissionByAssignmentId } from "@/lib/actions/submissionRequests";
import { SubmissionTable } from "@/components/submissions/submissionTable";
import LinkButton from "@/components/ui/link-button";
import DeleteAssignmentWithConfirmation from "@/components/ui/delete-assignment-confirmation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    params.id
  );

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>{assignment.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <p>Due Date: {formatDate(assignment.due_date)}</p>
            <p>Module: {assignment.subject}</p>
            <p>Created on: {formatDate(assignment.created_at)}</p>
            <p>Marks: {assignment.marks}</p>
          </div>
          <div className="comment">
            <p>{assignment.assignment_info}</p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="space-x-2">
            <LinkButton
              title={"Edit"}
              target={`/admin/dashboard/assignments/edit/${params.id}`}
            ></LinkButton>
            <DeleteAssignmentWithConfirmation
              assignment={assignment}
            ></DeleteAssignmentWithConfirmation>
          </div>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>
            View all submissions for this assignment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionTable submissions={submissions} admin={true} />
        </CardContent>
      </Card>
    </div>
  );
}
