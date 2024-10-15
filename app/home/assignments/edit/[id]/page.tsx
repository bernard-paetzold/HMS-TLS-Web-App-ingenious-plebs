import { AssignmentForm } from "@/components/assignments/assignmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAssignmentById } from "@/lib/actions/assignmentRequest";
import { getLecturerModules } from "@/lib/actions/userRequests";
import { assignment } from "@/lib/definitions";

export default async function Page({ params }: { params: { id: number } }) {
  const modules = await getLecturerModules();
  const assignment: assignment | null = await getAssignmentById(params.id);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <AssignmentForm
          modules={modules}
          assignment={assignment}
          isEditing={true}
        />
      </CardContent>
    </Card>
  );
}
