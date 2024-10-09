"use client";

import { read, utils } from "xlsx";
import { BaseSyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { createBulk } from "@/lib/actions/users/createBulk";
import { DjangoUser, UserRow } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CreatedUsersTable from "./created-users-table";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/ui/form-error";
import BulkTooltip from "./bulk-tooltip";

export default function AddBulkForm() {
  const [data, setData] = useState<string>("[]");
  const [users, setUsers] = useState<DjangoUser[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const noErrors = {
    file: null,
    fields: null,
    detail: null,
  };
  const [errors, setErrors] = useState<{
    file: string | null;
    fields: string | null;
    detail: string | null;
  }>(noErrors);

  // Transform XLSX to JSON
  async function parseFile(fileList: FileList) {
    if (!fileList || !fileList[0]) {
      setData("[]");
      return;
    }

    const buffer = await fileList[0].arrayBuffer();
    const book = read(buffer);
    const sheet = book.Sheets[book.SheetNames[0]];

    const data = utils.sheet_to_json<UserRow>(sheet);

    setData(JSON.stringify(data));
  }

  async function handleSubmit(e: BaseSyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);

    if (data === "[]") {
      setErrors((errors) => ({ ...errors, file: "Select a file to upload" }));
      setIsLoading(false);
      return;
    }

    const response = await createBulk(data);

    if (response.errors) {
      setErrors((errors) => ({ ...errors, ...response.errors }));
      setIsLoading(false);
      return;
    }

    setUsers(response.users);
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add multiple users</CardTitle>
        <CardDescription>
          Upload an xlsx file with the required <BulkTooltip className="ml-1" />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          {errors.file && <FormError>{errors.file}</FormError>}
          <Input
            className="mb-4 hover:cursor-pointer"
            type="file"
            accept=".xlsx"
            onChange={(e) => {
              setErrors(noErrors);
              if (e.target.files) {
                parseFile(e.target.files);
              }
            }}
          />
          <Button type="submit" disabled={isLoading}>
            Add users
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        {users && <CreatedUsersTable users={users} />}

        {/* Log errors directly to screen due to amount of possible errors */}
        {(errors.detail || errors.fields) && (
          <div className="flex flex-col gap-1">
            <p>Errors encountered</p>
            <pre className="bg-neutral-50 border-l-4 shadow border-l-red-500 rounded-md p-4">
              {errors.detail || errors.fields}
            </pre>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
