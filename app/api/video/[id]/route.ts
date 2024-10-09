import { NextRequest, NextResponse } from "next/server";
import { getFileStream } from "@/lib/actions/fileRequests";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  if (isNaN(params.id) || params.id == undefined) {
    return null;
  }

  const submissionId = params.id;
  const { stream, contentType } = await getFileStream(submissionId);

  if (!stream || !contentType) {
    return new NextResponse(null, { status: 404 });
  }

  const headers = new Headers();
  headers.set("Content-Type", contentType);
  headers.set("Transfer-Encoding", "chunked");

  return new NextResponse(stream, { headers });
}
