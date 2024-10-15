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
      console.log(user);
      return { submission, user };
    }),
  );

  const modules: module[] = await getLecturerModules();

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 pt-4">Home</h1>
      <section id="modules">
        <h2 className="text-2xl font-bold mb-6">Modules</h2>
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
      </section>
      <div id="jump-in">
        <h2 className="text-2xl font-bold mb-6">Jump back in</h2>
        <section id="assignments">
          <h2 className="text-xl font-bold mb-6">Recent Assignments</h2>
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
        </section>
        <section id="submissions">
          <h2 className="text-xl font-bold mb-6">Unmarked Submissions</h2>
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
        </section>
      </div>
    </main>
  );
}
