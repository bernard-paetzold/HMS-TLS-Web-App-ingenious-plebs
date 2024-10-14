import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import Fallback from "../fallback/fallback";
import ModuleTable from "./module-table";

export default function UserModulesCard({ username }: { username: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Modules</CardTitle>
        <CardDescription>List of modules relevant to this user</CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Fallback />}>
          <ModuleTable username={username} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
