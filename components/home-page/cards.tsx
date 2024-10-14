"use client";

import { Card, CardHeader, CardBody, Divider, Link } from "@nextui-org/react";

import { formatDate, truncateText } from "@/lib/utils";
import { assignment, module, submission } from "@/lib/definitions";
import { DjangoUser } from "../admin-dashboard/types";

// Assignment card component
export function AssignmentCard({ assignment }: { assignment: assignment }) {
  return (
    <Link
      key={assignment.name}
      href={`/home/assignments/assignment/${assignment.id}`}
    >
      <Card className="max-w-[400px] card-with-border">
        <CardHeader className="flex gap-3">
          <div>
            <h1 className="text-xl font-bold mb-6">{assignment.name}</h1>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="flex flex-col">
            Closes: {formatDate(assignment.due_date)}
          </p>
          <p className="comment">
            {truncateText(assignment.assignment_info, 20)}
          </p>
        </CardBody>
        <Divider />
      </Card>
    </Link>
  );
}

// Submission card component
export function SubmissionCard({
  user,
  submission,
}: {
  user: DjangoUser | null;
  submission: submission;
}) {
  return (
    <Link
      key={submission.id}
      href={`/home/submissions/submission/${submission.id}`}
    >
      <Card className="max-w-[400px] card-with-border">
        <CardHeader className="flex gap-3">
          <h1 className="text-xl mb-6">
            {user
              ? `${user.first_name || user.username} ${user.last_name || ""}`
              : "Unknown User"}
            : {submission.user}
          </h1>
        </CardHeader>
        <Divider />
        <CardBody>
          <p className="text-sm">
            Created on: {formatDate(submission.datetime)}
          </p>
          <p className="comment">{truncateText(submission.comment, 20)}</p>
        </CardBody>
        <Divider />
      </Card>
    </Link>
  );
}

// Module card component
export function ModuleCard({ module }: { module: module }) {
  return (
    <Link key={module.code} href={`/home/modules/${module.code}`}>
      <Card className="max-w-[400px] card-with-border">
        <CardHeader className="flex">
          <h1 className="text-xl font-bold mb-6">{module.code}</h1>
        </CardHeader>
      </Card>
    </Link>
  );
}
