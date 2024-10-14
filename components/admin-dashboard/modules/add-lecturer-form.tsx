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
import Fallback from "../fallback/fallback";
import LecturerCommandItem from "./lecturer-command-item";
import { getUsersByType } from "@/lib/actions/modules/getUsersByType";

export default function AddLecturerForm({ code }: Module) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add a Lectuer</CardTitle>
        <CardDescription>
          Select a lecturer to teach the module {code}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Fallback />}>
          <LecturerCommand code={code} />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function LecturerCommand({ code }: Module) {
  const response = await getUsersByType("lecturers");

  if (response.errors) {
    return (
      <div className="flex flex-col gap-1">
        <p>Errors encountered</p>
        <p className="bg-neutral-50 border-l-4 shadow border-l-red-500 rounded-md p-4">
          {response.errors.detail}
        </p>
      </div>
    );
  }

  return (
    <Command className="rounded-md border">
      <CommandInput placeholder="Enter username" />
      <CommandList>
        <CommandEmpty>No lecturers found.</CommandEmpty>
        <CommandGroup heading="Lecturers">
          {response.users.map((lecturer) => (
            <LecturerCommandItem
              key={lecturer.id}
              lecturer={lecturer}
              code={code}
            />
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
