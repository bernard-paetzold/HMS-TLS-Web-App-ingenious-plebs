"use server";

import { feedback } from "../definitions";
import { getToken } from "../session";

export async function getFeedbackBySubmissionId(
  id: number,
): Promise<feedback | null> {
  try {
    if (isNaN(id) || id == undefined) {
      return null;
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/feedback/submission_feedback/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      },
    );

    if (!response.ok) {
      if (response.status === 404) {
        // Feedback not found
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

export async function submitFeedback(data: {
  mark: number;
  comment: string;
  submissionId: number;
  feedbackId: number;
}) {
  const mark = data.mark;
  const comment = data.comment;
  const feedbackId = data.feedbackId;
  const submissionId = data.submissionId;

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/feedback/${feedbackId}/edit/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify({
          mark: mark ? Number(mark) : undefined,
          comment: comment || undefined,
          submission: submissionId ? Number(submissionId) : undefined,
        }),
      },
    );

    if (!response.ok) {
      //If the feedback does not exist, add it
      if (response.status == 404) {
        const response = await fetch(
          `${process.env.BACKEND_URL}/feedback/create/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: getToken(),
            },
            body: JSON.stringify({
              mark: mark ? Number(mark) : undefined,
              comment: comment || undefined,
              submission: submissionId ? Number(submissionId) : undefined,
            }),
          },
        );
        return response;
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    }

    const updatedFeedback = await response.json();
    return updatedFeedback;
  } catch (error) {
    console.error("An error occurred while updating feedback:", error);
    throw error;
  }
}

export async function getFeedbackByAssignmentId(
  id: number,
): Promise<feedback[]> {
  try {
    if (isNaN(id)) {
      const data: feedback[] = [];
      return data;
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}/feedback/assignment_feedback/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: feedback[] = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    const data: feedback[] = [];
    return data;
  }
}
