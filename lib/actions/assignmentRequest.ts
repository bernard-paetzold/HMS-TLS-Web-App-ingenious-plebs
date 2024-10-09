"use server";

import { assignment } from "../definitions";
import { getToken } from "../session";

export async function assignmentRequest(): Promise<assignment[]> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/assignment/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: assignment[] = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    const data: assignment[] = [];
    return data;
  }
}

export async function getAssignmentById(
  id: number,
): Promise<assignment | null> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/assignment/${id}/`,
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

    const data: assignment = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}

//Create new assignment
export async function createAssignment(formData: FormData) {
  const subject = formData.get("subject") as string;
  const name = formData.get("name") as string;
  const due_date = new Date(formData.get("due_date") as string);
  const marks = Number(formData.get("marks"));
  const assignment_info = formData.get("assignment_info") as string;

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/assignment/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify({
          subject,
          name,
          due_date,
          marks,
          assignment_info,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`,
      );
    }

    const Assignment = await response.json();
    return Assignment;
  } catch (error) {
    console.error("An error occurred while updating feedback:", error);
    throw error;
  }
}
