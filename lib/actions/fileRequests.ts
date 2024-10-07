"use server";

import { getToken } from "../session";

export async function getFileStream(
  submissionId: number,
): Promise<ReadableStream<Uint8Array> | null> {
  try {
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
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.body instanceof ReadableStream) {
      return response.body;
    } else {
      throw new Error("Response is not a ReadableStream");
    }
  } catch (error) {
    console.error("An error occurred while fetching video stream:", error);
    return null;
  }
}
