import { getLecturerModules } from "@/lib/actions/userRequests";
import { ModuleCard } from "@/components/home-page/cards";
import { module } from "@/lib/definitions";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page() {
  const modules: module[] = await getLecturerModules();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modules</CardTitle>
        <CardDescription>List of your modules</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4 justify-center">
          {modules && modules.length > 0 ? (
            modules.map((module) => (
              <ModuleCard key={module.code} module={module} />
            ))
          ) : (
            <p>No modules assigned.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
