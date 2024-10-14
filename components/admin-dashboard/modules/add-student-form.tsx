import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
} from "@/components/ui/command";

import { Module } from "../types";
import { Suspense } from "react";
import StudentCommandItem from "./student-command-item";
import Fallback from "../fallback/fallback";
import { getUsersByType } from "@/lib/actions/modules/getUsersByType";

export default function AddStudentForm({ code }: Module) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Student</CardTitle>
        <CardDescription>
          Select a student to receive the module {code}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Fallback />}>
          <StudentCommand code={code} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function StudentCommand({ code }: Module) {
  const response = await getUsersByType("students");

  if (response.errors) {
    return <div>{response.errors.detail}</div>;
  }

  return (
    <Command className="rounded-md border">
      <CommandInput placeholder="Enter username" />
      <CommandList>
        <CommandEmpty>No students found.</CommandEmpty>
        <CommandGroup heading="Students">
          {response.users.map((student) => (
            <StudentCommandItem
              key={student.id}
              student={student}
              code={code}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
