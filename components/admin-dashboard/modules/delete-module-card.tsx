import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Module } from "../types";
import DeleteModuleDialog from "./delete-module-dialog";

export default function DeleteModuleCard({ code }: Module) {
  return (
    <Card className="border-red-500">
      <CardHeader>
        <CardTitle>Danger Zone</CardTitle>
      </CardHeader>
      <CardContent>
        <DeleteModuleDialog code={code} />
      </CardContent>
    </Card>
  );
}
