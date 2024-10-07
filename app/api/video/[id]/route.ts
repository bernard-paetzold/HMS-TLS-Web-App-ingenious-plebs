import { NextRequest, NextResponse } from "next/server";
import { getFileStream } from "@/lib/actions/fileRequests";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const submissionId = parseInt(params.id);
  const stream = await getFileStream(submissionId);

  if (!stream) {
    return new NextResponse(null, { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", "video/MP4");
  headers.set("Transfer-Encoding", "chunked");

  console.log(stream);

  return new NextResponse(stream, { headers });
}
