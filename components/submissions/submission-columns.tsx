"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { submission } from "@/lib/definitions";
import { formatDate, truncateText } from "@/lib/utils";
import { TitleLink } from "../ui/title-link";
import { useRouter } from "next/navigation";
import DeleteSubmissionWithConfirmation from "../ui/delete-submission-confirmation";

export const userColumns: ColumnDef<submission>[] = [
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
    id: "action",
    cell: ({ row }) => {
      const submission = row.original;
      const router = useRouter();

      const handleButtonClick = () => {
        router.push(`/home/submissions/submission/${submission.id}`);
      };

      return (
        <Button onClick={handleButtonClick} variant="outline" size="sm">
          Open
        </Button>
      );
    },
  },
];

export const adminColumns: ColumnDef<submission>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortHeader column={column} title="ID" />,
    cell: ({ row }) => {
      const cell = (
        <TitleLink
          title={row.getValue("id")}
          url={`/admin/dashboard/assignments/submissions/submission/${row.getValue("id")}`}
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
    id: "action",
    cell: ({ row }) => {
      const submission = row.original;
      const router = useRouter();

      const handleButtonClick = () => {
        router.push(
          `/admin/dashboard/assignments/submissions/submission/${submission.id}`,
        );
      };

      return (
        <div className="flex space-x-2">
          <Button onClick={handleButtonClick} variant="outline" size="sm">
            Open
          </Button>
          <DeleteSubmissionWithConfirmation
            submission={submission}
          ></DeleteSubmissionWithConfirmation>
        </div>
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
