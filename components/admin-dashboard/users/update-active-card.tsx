import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import SetActiveDialog from "./set-active-dialog";
import { User } from "../types";

export default function UpdateActiveCard({
  user,
  onActiveChange,
}: {
  user: User;
  onActiveChange: VoidFunction;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Status</CardTitle>
        <CardDescription>
          User is currently {user.isActive ? "activated" : "deactivated"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SetActiveDialog
          username={user.username}
          isActive={user.isActive}
          onActiveChange={onActiveChange}
        />
      </CardContent>
    </Card>
  );
}
