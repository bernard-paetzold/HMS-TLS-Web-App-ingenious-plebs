import { module } from "@/lib/definitions";
import { getAllowedAssignments } from "@/lib/actions/assignmentRequest";
import {
  AssignmentCard,
  ModuleCard,
  SubmissionCard,
} from "@/components/home-page/cards";
import { getUnmarkedSubmissions } from "@/lib/actions/submissionRequests";
import CardScroller from "@/components/home-page/card-scroller";
import { getLecturerModules } from "@/lib/actions/userRequests";
import { getOtherUserById } from "@/lib/actions/users/getOtherUser";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  let [assignments, submissions] = await Promise.all([
    getAllowedAssignments(),
    getUnmarkedSubmissions(),
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

  const modules: module[] = await getLecturerModules();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 pt-4">Home</h1>
      <Card id="modules">
        <CardHeader>
          <CardTitle>Modules</CardTitle>
        </CardHeader>
        <CardContent>
          <CardScroller>
            <div className="flex gap-4 pb-4">
              {modules && modules.length > 0 ? (
                modules.map((module) => (
                  <div key={module.code} className="flex-shrink-0 w-64">
                    <ModuleCard module={module} />
                  </div>
                ))
              ) : (
                <p>No modules assigned.</p>
              )}
            </div>
          </CardScroller>
        </CardContent>
      </Card>
      <div id="jump-in" className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mt-4">Jump back in</h2>
        <Card id="assignments">
          <CardHeader>
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
        <Card id="submissions">
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
      </div>
    </div>
  );
}
