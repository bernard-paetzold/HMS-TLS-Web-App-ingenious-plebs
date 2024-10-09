"use server";

import { getToken } from "../session";

export async function getFileStream(submissionId: number): Promise<{
  stream: ReadableStream<Uint8Array> | null;
  contentType: string | null;
}> {
  try {
    if (isNaN(submissionId) || submissionId == undefined) {
      return { stream: null, contentType: null };
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/file_access/stream/${submissionId}/`,
      {
        method: "GET",
        headers: {
          Authorization: getToken(),
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        //Stream null
        return { stream: null, contentType: null };
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("Content-Type");

    if (response.body instanceof ReadableStream) {
      return { stream: response.body, contentType };
    } else {
      throw new Error("Response is not a ReadableStream");
    }
  } catch (error) {
    console.error("An error occurred while fetching video stream:", error);
    return { stream: null, contentType: null };
  }
}
