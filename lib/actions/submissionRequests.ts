"use server";

import { submission } from "../definitions";
import { getToken } from "../session";

export async function getSubmissionById(
  id: number,
): Promise<submission | null> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/submission/${id}/`,
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
        // Assignment not found
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: submission = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

export async function getSubmissionByAssignmentId(
  id: number,
): Promise<submission[]> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/submission/list_assignment_submissions/${id}/`,
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

    const data: submission[] = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    const data: submission[] = [];
    return data;
  }
}
