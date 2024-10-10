import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import DeleteUserDialog from "./delete-user-dialog";

export default function DeleteCard({ username }: { username: string }) {
  return (
    <Card className="border-red-500">
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
      </CardHeader>
      <CardContent>
        <DeleteUserDialog username={username} />
      </CardContent>
    </Card>
  );
}
