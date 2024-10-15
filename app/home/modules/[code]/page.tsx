import { getModuleAssignments } from "@/lib/actions/assignmentRequest";
import { AssignmentCard, SubmissionCard } from "@/components/home-page/cards";
import { getUnmarkedSubmissionsByModule } from "@/lib/actions/submissionRequests";
import CardScroller from "@/components/home-page/card-scroller";
import { AssignmentTable } from "@/components/assignments/assignmentTable";
import { getOtherUserById } from "@/lib/actions/users/getOtherUser";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page({ params }: { params: { code: string } }) {
  let [assignments, submissions] = await Promise.all([
    getModuleAssignments(params.code),
    getUnmarkedSubmissionsByModule(params.code),
  ]);

  assignments = assignments.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  submissions = submissions.sort((a, b) => {
    return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
  });

  const submissionsWithUsers = await Promise.all(
    submissions.map(async (submission) => {
      const user = await getOtherUserById(submission.user);
      return { submission, user };
    })
  );

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold pt-4">{params.code}</h1>
      <Card>
        <CardHeader id="recent-assignments">
          <CardTitle>Recent Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <CardScroller>
            <div className="flex gap-4 pb-4">
              {assignments && assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <div key={assignment.id} className="flex-shrink-0 w-64">
                    <AssignmentCard assignment={assignment} />
                  </div>
                ))
              ) : (
                <p>No assignments available.</p>
              )}
            </div>
          </CardScroller>
        </CardContent>
      </Card>
      <Card id="unmarked-submissions">
        <CardHeader>
          <CardTitle>Unmarked Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <CardScroller>
            <div className="flex gap-4 pb-4">
              {submissionsWithUsers && submissionsWithUsers.length > 0 ? (
                submissionsWithUsers.map((submissionWithUser) => (
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
      <Card id="assignments">
        <CardHeader>
          <CardTitle>All Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <AssignmentTable assignments={assignments} admin={false} />
        </CardContent>
      </Card>
    </div>
  );
}
