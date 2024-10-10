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

export const columns: ColumnDef<DjangoUser>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => <SortHeader column={column} title="Username" />,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => <SortHeader column={column} title="First name" />,
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => <SortHeader column={column} title="Last name" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <SortHeader column={column} title="Email" />,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <SortHeader column={column} title="Role" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
              <Link href={`/admin/dashboard/users/view/${user.username}`}>
                View user
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/dashboard/users/edit/${user.username}`}>
                Edit user
              </Link>
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
