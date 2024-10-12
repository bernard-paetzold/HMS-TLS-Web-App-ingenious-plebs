"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
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
import { submission } from "@/lib/definitions";
import { formatDate, truncateText } from "@/lib/utils";
import { TitleLink } from "../title-link";
import { getOtherUserById } from "@/lib/actions/users/getOtherUser";
import { DjangoUser } from "@/components/admin-dashboard/types";

export const columns: ColumnDef<submission>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortHeader column={column} title="ID" />,
    cell: ({ row }) => {
      const cell = (
        <TitleLink
          title={row.getValue("id")}
          url={`/home/submissions/submission/${row.getValue("id")}`}
        />
      );

      return cell;
    },
    enableHiding: true,
  },
  {
    accessorKey: "user",
    header: ({ column }) => (
      <SortHeader column={column} title="Student number" />
    ),
  },
  {
    accessorKey: "datetime",
    header: ({ column }) => (
      <SortHeader column={column} title="Submission date" />
    ),
    cell: ({ row }) => {
      const date = formatDate(row.getValue("datetime"));
      return date;
    },
  },
  {
    accessorKey: "comment",
    header: () => <PlainHeader title="Details" />,
    cell: ({ row }) => {
      const truncText = truncateText(row.getValue("comment"), 25);
      return truncText;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const submission = row.original;

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
              <Link href={`/home/submissions/submission/${submission.id}`}>
                View submission
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
  column: Column<submission, unknown>;
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

function PlainHeader({ title }: { title: string }) {
  return <h1>{title}</h1>;
}
