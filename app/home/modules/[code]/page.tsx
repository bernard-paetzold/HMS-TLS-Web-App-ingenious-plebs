import { getModuleAssignments } from "@/lib/actions/assignmentRequest";
import { AssignmentCard, SubmissionCard } from "@/components/home-page/cards";
import { getUnmarkedSubmissionsByModule } from "@/lib/actions/submissionRequests";
import CardScroller from "@/components/home-page/card-scroller";
import { AssignmentTable } from "@/components/home-page/assignments/assignment";
import { getOtherUserById } from "@/lib/actions/users/getOtherUser";

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
      console.log(user);
      return { submission, user };
    }),
  );

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">{params.code}</h1>
      <section id="recent-assignments">
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
      <section id="unmarked-submissions">
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
      <section id="assignments">
        <h1 className="text-2xl font-bold mb-6">All Assignments</h1>
        <div className="flex flex-wrap gap-4 justify-center">
          <AssignmentTable assignments={assignments} />
        </div>
      </section>
    </main>
  );
}
