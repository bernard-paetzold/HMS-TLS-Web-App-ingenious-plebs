"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { Module } from "../types";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export const columns: ColumnDef<Module>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => <SortHeader column={column} title="Code" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mod = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild>
              <Link href={`/admin/dashboard/modules/view/${mod.code}`}>
                View module
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/dashboard/modules/edit/${mod.code}`}>
                Edit module
              </Link>
            </DropdownMenuItem>

            {/* todo: add students and lecturers to modules*/}
            <DropdownMenuItem asChild>
              <Link href={`/admin/dashboard/modules/users/${mod.code}`}>
                Add lecturer
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/admin/dashboard/modules/users/${mod.code}?type=student`}
              >
                Add student
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

function SortHeader({
  column,
  title,
}: {
  column: Column<Module, unknown>;
  title: string;
}) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
}
