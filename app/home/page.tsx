import { assignment, module } from "@/lib/definitions";
import { assignmentRequest } from "@/lib/actions/assignmentRequest";
import {
  AssignmentCard,
  ModuleCard,
  SubmissionCard,
} from "@/components/home-page/cards";
import { getUnmarkedSubmissions } from "@/lib/actions/submissionRequests";
import CardScroller from "@/components/home-page/card-scroller";
import { getLecturerModules } from "@/lib/actions/userRequests";

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

  const modules: module[] = await getLecturerModules();

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Home</h1>
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
      </div>
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
              <p>No assignments available.</p>
            )}
          </div>
        </CardScroller>
      </section>
    </main>
  );
}
