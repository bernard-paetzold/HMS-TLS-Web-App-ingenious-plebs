"use client";

import { Card, CardHeader, CardBody, Divider, Link } from "@nextui-org/react";

import { formatDate, navigateToAssignment, truncateText } from "@/lib/utils";
import { assignment, submission } from "@/lib/definitions";

// Assignment card component
export function AssignmentCard({ assignment }: { assignment: assignment }) {
  return (
    <Card className="max-w-[400px] card-with-border">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <Link
            className="text-xl font-bold mb-6 underline"
            key={assignment.name}
            href={`/home/assignments/assignment/${assignment.id}`}
          >
            {assignment.name}
          </Link>
          <p className="text-sm">Closes: {formatDate(assignment.due_date)}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="comment">
          {truncateText(assignment.assignment_info, 100)}
        </p>
      </CardBody>
      <Divider />
    </Card>
  );
}

// Submission card component
export function SubmissionCard({ submission }: { submission: submission }) {
  return (
    <Card className="max-w-[400px] card-with-border">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <Link
            className="text-xl font-bold mb-6 underline"
            key={submission.id}
            href={`/home/submissions/submission/${submission.id}`}
          >
            {submission.id}
          </Link>
          <p className="text-sm">
            Created on: {formatDate(submission.datetime)}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p className="comment">{truncateText(submission.comment, 100)}</p>
      </CardBody>
      <Divider />
    </Card>
  );
}
