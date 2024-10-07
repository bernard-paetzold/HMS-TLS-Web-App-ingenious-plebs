import { submission } from "@/lib/definitions";
import { getSubmissionById } from "@/lib/actions/submissionRequests";
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
  const submission: submission | null = await getSubmissionById(params.id);

  if (!submission) {
    return <div>Assignment not found</div>;
  }

  const videoStream = `/api/video/${submission.id}`;

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">{submission.id}</h1>
      <div>
        <div>
          <p>Submission date: {formatDate(submission.datetime)}</p>
          <p>File: {submission.file}</p>
        </div>
        <div>
          <Video src={videoStream} />
        </div>
        <div className="comment">
          <p>{submission.comment}</p>
        </div>
      </div>
    </main>
  );
}
