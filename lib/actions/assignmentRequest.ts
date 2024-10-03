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

type AssignmentIDResponse = {
  errors: {
    fields?: {
      assignment_id?: number | undefined;
    };
    credentials?: string;
    other?: string;
  };
};

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
