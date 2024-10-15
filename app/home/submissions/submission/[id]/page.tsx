import { TitleLink } from "@/components/ui/title-link";
import { FeedbackForm } from "@/components/feedback/feedbackForm";
import { getAssignmentById } from "@/lib/actions/assignmentRequest";
import { getFeedbackBySubmissionId } from "@/lib/actions/feedbackRequests";
import { getSubmissionById } from "@/lib/actions/submissionRequests";
import { getOtherUserById } from "@/lib/actions/users/getOtherUser";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import Video from "next-video";
import DownloadButton from "@/components/ui/DownloadButton";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function Page({ params }: { params: { id: number } }) {
  const [submission, feedback] = await Promise.all([
    getSubmissionById(params.id),
    getFeedbackBySubmissionId(params.id),
  ]);

  if (!submission) {
    return <div>Submission not found</div>;
  }
  const assignment = await getAssignmentById(submission.assignment);

  const user = await getOtherUserById(submission.user);

  if (!assignment) {
    return <div>Submission not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>
            Submission for&nbsp;
            <TitleLink
              title={assignment.name}
              url={`/home/assignments/assignment/${assignment.id}`}
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h2 className="text-xl mb-6">
            By: {user?.first_name ?? user?.username} {user?.last_name}
          </h2>
          <div className="mb-4 mt-0">
            <u>{formatDate(submission.datetime)}</u>
          </div>
          <div className="space-y-8">
            <div>
              <VideoPlayer id={params.id} />
            </div>

            <div className="comment">
              <p>{submission.comment}</p>
            </div>
            <div>
              <DownloadButton submission={submission}></DownloadButton>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="mt-4">
          <FeedbackForm
            initialFeedback={feedback}
            submissionId={submission.id}
            assignment={assignment}
          />
        </CardContent>
      </Card>
    </div>
  );
}

function VideoPlayer({ id }: { id: number }) {
  if (isNaN(id) || id == undefined) {
    return <></>;
  }

  const fileStreamUrl = `/api/video/${id}`;

  return <Video src={fileStreamUrl} />;
}
