import { AssignmentForm } from "@/components/assignments/assignmentForm";
import { getAssignmentById } from "@/lib/actions/assignmentRequest";
import { getAllModules } from "@/lib/actions/modules/getAllModules";
import { assignment } from "@/lib/definitions";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page({ params }: { params: { id: number } }) {
  const response = await getAllModules();
  const assignment: assignment | null = await getAssignmentById(params.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Assignment</CardTitle>
        <CardDescription>Enter the required details</CardDescription>
      </CardHeader>
      <CardContent>
        <AssignmentForm
          modules={response.modules || []}
          assignment={assignment}
          isEditing={true}
        />
      </CardContent>
    </Card>
  );
}
