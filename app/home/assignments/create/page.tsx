import { AssignmentForm } from "@/components/assignments/assignmentForm";
import { getLecturerModules } from "@/lib/actions/userRequests";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Page() {
  const modules = await getLecturerModules();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Assignment</CardTitle>
      </CardHeader>
      <CardContent>
        <AssignmentForm modules={modules} assignment={null} isEditing={false} />
      </CardContent>
    </Card>
  );
}
