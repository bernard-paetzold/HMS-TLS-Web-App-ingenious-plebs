"use client";

import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

type Log = {
  id: number;
  t_stamp: string;
  token: string;
  event_origin: string;
  extra: {
    activity: string;
    ip_address: string;
    user_agent: string;
  };
};

export const logColumns: ColumnDef<Log>[] = [
  {
    accessorKey: "t_stamp",
    header: ({ column }) => <SortHeader column={column} title="Time stamp" />,
  },
  {
    accessorKey: "token",
    header: ({ column }) => <SortHeader column={column} title="Token" />,
  },
  {
    accessorKey: "extra.activity",
    header: ({ column }) => <SortHeader column={column} title="Activity" />,
  },
  {
    accessorKey: "extra.ip_address",
    header: ({ column }) => <SortHeader column={column} title="IP address" />,
  },
  {
    accessorKey: "extra.user_agent",
    header: ({ column }) => <SortHeader column={column} title="User agent" />,
  },
];

function SortHeader({
  column,
  title,
}: {
  column: Column<Log, unknown>;
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
