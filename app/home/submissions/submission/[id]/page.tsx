import { getAssignmentById } from "@/lib/actions/assignmentRequest";
import {
  getFeedbackBySubmissionId,
  submitFeedback,
} from "@/lib/actions/feedbackRequests";
import { getSubmissionById } from "@/lib/actions/submissionRequests";
import { assignment, feedback, submission } from "@/lib/definitions";

import Video from "next-video";

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
  console.log(submission);
  const assignment = await getAssignmentById(submission.assignment);

  if (!assignment) {
    return <div>Submission not found</div>;
  }

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">{submission.id}</h1>
      <div>
        <div>
          <p>Submission date: {formatDate(submission.datetime)}</p>
          <p>File: {submission.file}</p>
        </div>
        <div>
          <VideoPlayer id={params.id} />
        </div>
        <div className="comment">
          <p>{submission.comment}</p>
        </div>
        <div>
          <FeedbackForm
            initialFeedback={feedback}
            submissionId={submission.id}
            assignment={assignment}
          />
        </div>
      </div>
    </main>
  );
}

function VideoPlayer({ id }: { id: number }) {
  if (isNaN(id) || id == undefined) {
    return <></>;
  }

  const fileStreamUrl = `/api/video/${id}`;

  return <Video src={fileStreamUrl} />;
}

function FeedbackForm({
  initialFeedback,
  submissionId,
  assignment,
}: {
  initialFeedback: feedback | null;
  submissionId: number;
  assignment: assignment;
}) {
  return (
    <form action={submitFeedback} className="mt-6 space-y-4">
      <h2 className="text-xl font-semibold">
        {initialFeedback ? "Edit Feedback" : "Create Feedback"}
      </h2>
      <input type="hidden" name="submissionId" value={submissionId} />
      {initialFeedback && (
        <input type="hidden" name="feedbackId" value={initialFeedback.id} />
      )}
      <div>
        <label
          htmlFor="mark"
          className="block text-sm font-medium text-gray-700"
        >
          Mark: (0 - {assignment.marks})
        </label>
        <div className="flex items-center">
          <input
            type="number"
            id="mark"
            name="mark"
            defaultValue={initialFeedback?.mark ?? ""}
            min="0"
            max={assignment.marks}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700"
        >
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          defaultValue={initialFeedback?.comment ?? ""}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {initialFeedback ? "Update Feedback" : "Submit Feedback"}
      </button>
    </form>
  );
}
