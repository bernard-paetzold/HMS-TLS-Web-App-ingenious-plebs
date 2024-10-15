import { assignment } from "@/lib/definitions";
import { assignmentRequest } from "@/lib/actions/assignmentRequest";
import { AssignmentTable } from "@/components/assignments/assignmentTable";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page() {
  const assignments: assignment[] = await assignmentRequest();

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Assignments</CardTitle>
        <CardDescription>View all assignments</CardDescription>
      </CardHeader>
      <CardContent>
        <AssignmentTable assignments={assignments} admin={true} />
      </CardContent>
    </Card>
  );
}
