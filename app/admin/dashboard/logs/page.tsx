import Fallback from "@/components/admin-dashboard/fallback/fallback";
import { logColumns } from "@/components/admin-dashboard/logs/log-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getLogs } from "@/lib/actions/logs/getLogs";
import { Suspense } from "react";

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Logs</CardTitle>
        <CardDescription>
          List of logs generated by the system for the past week
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Fallback />}>
          <Logs />
        </Suspense>
      </CardContent>
    </Card>
  );
}

async function Logs() {
  // Display past week's logs
  const endDate = new Date();
  const startDate = new Date(endDate.getDate() - 7);

  const response = await getLogs(
    startDate.toISOString(),
    endDate.toISOString()
  );

  if (response.errors) {
    return <p>{response.errors.detail}</p>;
  }

  return (
    <DataTable
      columns={logColumns}
      data={response.logs}
      filter={{ column: "t_stamp", placeholder: "Filter by time stamp" }}
    />
  );
}
