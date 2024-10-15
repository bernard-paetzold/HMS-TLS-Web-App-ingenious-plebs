import { submission } from "@/lib/definitions";
import { getAllSubmissions } from "@/lib/actions/submissionRequests";
import { SubmissionTable } from "@/components/submissions/submissionTable";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page() {
  const submissions: submission[] = await getAllSubmissions();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissions</CardTitle>
        <CardDescription>View all student submissions</CardDescription>
      </CardHeader>
      <CardContent>
        <SubmissionTable
          submissions={submissions}
          admin={true}
        ></SubmissionTable>
      </CardContent>
    </Card>
  );
}
