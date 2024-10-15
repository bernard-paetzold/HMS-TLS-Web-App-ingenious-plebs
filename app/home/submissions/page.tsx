import { submission } from "@/lib/definitions";
import { getAllowedSubmissions } from "@/lib/actions/submissionRequests";
import { SubmissionTable } from "@/components/submissions/submissionTable";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  const submissions: submission[] = await getAllowedSubmissions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        <SubmissionTable
          submissions={submissions}
          admin={false}
        ></SubmissionTable>
      </CardContent>
    </Card>
  );
}
