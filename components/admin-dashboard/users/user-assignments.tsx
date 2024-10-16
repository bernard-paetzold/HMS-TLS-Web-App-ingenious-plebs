import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { getLecturerAssignments } from "@/lib/actions/assignmentRequest";
import { Row } from "./row";

export async function UserAssignments({ username }: { username: string }) {
  const assignments = await getLecturerAssignments(username);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
        <CardDescription>Assignments created by this user</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          {assignments.length > 0 ? (
            assignments.map((assignment, i) => (
              <Row key={assignment.id} noBorder={i === 0}>
                <Link
                  href={`/admin/dashboard/assignments/${assignment.id}`}
                  className="underline underline-offset-2"
                >
                  {assignment.name}
                </Link>
              </Row>
            ))
          ) : (
            <p>No assignments</p>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
