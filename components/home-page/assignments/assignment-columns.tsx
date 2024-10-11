"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { DjangoUser } from "../types";
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
import { assignment } from "@/lib/definitions";
import { formatDate, truncateText } from "@/lib/utils";

export const columns: ColumnDef<assignment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => <SortHeader column={column} title="Name" />,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => <SortHeader column={column} title="Module" />,
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => <SortHeader column={column} title="Due date" />,
    cell: ({ row }) => {
      const date = formatDate(row.getValue("due_date"));
      return date;
    },
  },
  {
    accessorKey: "marks",
    header: ({ column }) => <SortHeader column={column} title="Marks" />,
  },
  {
    accessorKey: "assignment_info",
    header: ({ column }) => <SortHeader column={column} title="Details" />,
    cell: ({ row }) => {
      const truncText = truncateText(row.getValue("assignment_info"), 25);
      return truncText;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const assignment = row.original;

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
              <Link href={`/home/assignments/assignment/${assignment.id}`}>
                View assignment
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/dashboard/users/edit/`}>Edit user</Link>
            </DropdownMenuItem>

            {/* TODO */}
            <DropdownMenuItem onClick={() => alert("Do something")}>
              Edit modules
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
  column: Column<DjangoUser, unknown>;
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
