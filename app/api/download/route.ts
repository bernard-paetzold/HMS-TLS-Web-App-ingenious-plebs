import { NextRequest, NextResponse } from "next/server";
import { getFileStream } from "@/lib/actions/fileRequests";

export async function POST(req: NextRequest) {
  try {
    const { submissionId } = await req.json();

    if (!submissionId) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 },
      );
    }

    console.log("Attempting to fetch file for submission:", submissionId);

    const { stream, contentType } = await getFileStream(submissionId);

    if (!stream || !contentType) {
      console.error("File not found or not accessible");
      return new NextResponse(null, { status: 404 });
    }

    const headers = new Headers();
    headers.set("Content-Type", contentType);
    headers.set("Content-Disposition", "attachment");
    headers.set("Transfer-Encoding", "chunked");

    console.log("File stream obtained, sending response");

    return new NextResponse(stream, { headers });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json(
      { error: "Error downloading file", details: "" },
      { status: 500 },
    );
  }
}
