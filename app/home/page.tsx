import { assignment } from "@/lib/definitions";
import { assignmentRequest } from "@/lib/actions/assignmentRequest";
import { AssignmentCard, SubmissionCard } from "@/components/home-page/cards";
import { getUnmarkedSubmissions } from "@/lib/actions/submissionRequests";
import CardScroller from "@/components/home-page/card-scroller";

export default async function Page() {
  let [assignments, submissions] = await Promise.all([
    assignmentRequest(),
    getUnmarkedSubmissions(),
  ]);

  assignments = assignments.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  submissions = submissions.sort((a, b) => {
    return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
  });

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Home</h1>
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
      <section id="assignments">
        <h2 className="text-xl font-bold mb-6">Unmarked Submissions</h2>
        <CardScroller>
          <div className="flex gap-4 pb-4">
            {submissions && submissions.length > 0 ? (
              submissions.map((submission) => (
                <div key={submission.id} className="flex-shrink-0 w-64">
                  <SubmissionCard submission={submission} />
                </div>
              ))
            ) : (
              <p>No unmarked submissions.</p>
            )}
          </div>
        </CardScroller>
      </section>
    </main>
  );
}
