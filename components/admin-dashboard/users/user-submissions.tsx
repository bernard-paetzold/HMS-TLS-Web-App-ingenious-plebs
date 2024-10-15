import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getUserSubmissions } from "@/lib/actions/submissionRequests";
import { Row } from "./row";

export async function UserSubmissions({ userID }: { userID: number }) {
  const submissions = await getUserSubmissions(userID);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissions</CardTitle>
        <CardDescription>Submissions made by this user</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {submissions.length > 0 ? (
            submissions.map((submission, i) => (
              <Row key={submission.id} noBorder={i === 0}>
                <Link
                  href={`/admin/dashboard/assignments/submissions/submission/${submission.id}`}
                  className="underline underline-offset-2"
                >
                  Assignment ID: {submission.assignment}
                </Link>
              </Row>
            ))
          ) : (
            <p>No submissions</p>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
