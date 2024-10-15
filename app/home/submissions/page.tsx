import { submission } from "@/lib/definitions";
import { getAllowedSubmissions } from "@/lib/actions/submissionRequests";
import { SubmissionTable } from "@/components/submissions/submissionTable";

export default async function Page() {
  const submissions: submission[] = await getAllowedSubmissions();

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Submissions</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        <SubmissionTable
          submissions={submissions}
          admin={false}
        ></SubmissionTable>
      </div>
    </main>
  );
}
