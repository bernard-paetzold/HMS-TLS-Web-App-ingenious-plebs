import { assignment, submission } from "@/lib/definitions";
import { getAssignmentById } from "@/lib/actions/assignmentRequest";

import {
  getSubmissionByAssignmentId,
  getUnmarkedSubmissions,
} from "@/lib/actions/submissionRequests";
import { SubmissionCard } from "@/components/home-page/cards";
import CardScroller from "@/components/home-page/card-scroller";
import { SubmissionTable } from "@/components/submissions/submissionTable";
import LinkButton from "@/components/ui/link-button";
import DeleteAssignmentWithConfirmation from "@/components/ui/delete-assignment-confirmation";
import { getOtherUserById } from "@/lib/actions/users/getOtherUser";
import {
  Card,
  CardContent,
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
  let unmarkedSubmissions = await getUnmarkedSubmissions();

  unmarkedSubmissions = unmarkedSubmissions.filter((unmarked) =>
    submissions.some((submission) => submission.id === unmarked.id)
  );

  if (!assignment) {
    return <div>Assignment not found</div>;
  }

  const unmarkedSubmissionsWithUsers = await Promise.all(
    unmarkedSubmissions.map(async (submission) => {
      const user = await getOtherUserById(submission.user);
      console.log(user);
      return { submission, user };
    })
  );

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
        <CardFooter className="space-x-2">
          <LinkButton
            title={"Edit"}
            target={`/home/assignments/edit/${params.id}`}
          ></LinkButton>
          <DeleteAssignmentWithConfirmation
            assignment={assignment}
          ></DeleteAssignmentWithConfirmation>
        </CardFooter>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Unmarked Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <CardScroller>
            <div className="flex gap-4 pb-4">
              {unmarkedSubmissionsWithUsers &&
              unmarkedSubmissionsWithUsers.length > 0 ? (
                unmarkedSubmissionsWithUsers.map((submissionWithUser) => (
                  <div
                    key={submissionWithUser.submission.id}
                    className="flex-shrink-0 w-64"
                  >
                    <SubmissionCard
                      submission={submissionWithUser.submission}
                      user={submissionWithUser.user}
                    />
                  </div>
                ))
              ) : (
                <p className="pb-4">No unmarked submissions.</p>
              )}
            </div>
          </CardScroller>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>All Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <SubmissionTable submissions={submissions} admin={false} />
        </CardContent>
      </Card>
    </div>
  );
}
