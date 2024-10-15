"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { assignment } from "@/lib/definitions";
import { formatDate, truncateText } from "@/lib/utils";
import { TitleLink } from "../ui/title-link";

import { useRouter } from "next/navigation";
import DeleteAssignmentWithConfirmation from "../ui/delete-assignment-confirmation";
import DownloadCSVButton from "../ui/download-csv";

export const userColumns: ColumnDef<assignment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortHeader column={column} title="ID" />,
    cell: ({ row }) => {
      const cell = (
        <TitleLink
          title={row.getValue("id")}
          url={`/home/assignments/assignment/${row.getValue("id")}`}
        />
      );

      return cell;
    },
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const cell = (
        <TitleLink
          title={row.getValue("name")}
          url={`/home/assignments/assignment/${row.getValue("id")}`}
        />
      );

      return cell;
    },
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
    header: () => <PlainHeader title="Details" />,
    cell: ({ row }) => {
      const truncText = truncateText(row.getValue("assignment_info"), 25);
      return truncText;
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const assignment = row.original;
      const router = useRouter();

      const handleButtonClick = () => {
        router.push(`/home/assignments/assignment/${assignment.id}`);
      };

      const handleEditButtonClick = () => {
        router.push(`/home/assignments/edit/${assignment.id}`);
      };

      return (
        <div className="flex space-x-2">
          <Button onClick={handleButtonClick} variant="outline" size="sm">
            Open
          </Button>
          <Button onClick={handleEditButtonClick} variant="outline" size="sm">
            Edit
          </Button>
          <DownloadCSVButton assignment={assignment}></DownloadCSVButton>
        </div>
      );
    },
  },
];

export const adminColumns: ColumnDef<assignment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <SortHeader column={column} title="ID" />,
    cell: ({ row }) => {
      const cell = (
        <TitleLink
          title={row.getValue("id")}
          url={`/admin/dashboard/assignments/${row.getValue("id")}`}
        />
      );

      return cell;
    },
    enableHiding: true,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const cell = (
        <TitleLink
          title={row.getValue("name")}
          url={`/admin/dashboard/assignments/${row.getValue("id")}`}
        />
      );

      return cell;
    },
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
    header: () => <PlainHeader title="Details" />,
    cell: ({ row }) => {
      const truncText = truncateText(row.getValue("assignment_info"), 25);
      return truncText;
    },
  },
  {
    id: "action",
    cell: ({ row }) => {
      const assignment = row.original;
      const router = useRouter();

      const handleButtonClick = () => {
        router.push(`/admin/dashboard/assignments/${assignment.id}`);
      };

      const handleEditButtonClick = () => {
        router.push(`/admin/dashboard/assignments/edit/${assignment.id}`);
      };

      return (
        <div className="flex space-x-2">
          <Button onClick={handleButtonClick} variant="outline" size="sm">
            Open
          </Button>
          <Button onClick={handleEditButtonClick} variant="outline" size="sm">
            Edit
          </Button>
          <DownloadCSVButton assignment={assignment}></DownloadCSVButton>
          <DeleteAssignmentWithConfirmation
            assignment={assignment}
          ></DeleteAssignmentWithConfirmation>
        </div>
      );
    },
  },
];

function SortHeader({
  column,
  title,
}: {
  column: Column<assignment, unknown>;
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
