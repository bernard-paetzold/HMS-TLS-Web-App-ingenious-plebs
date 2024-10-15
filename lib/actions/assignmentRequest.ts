"use server";

import { assignment } from "../definitions";
import { getToken } from "../session";

export async function assignmentRequest(): Promise<assignment[]> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/assignment/list_allowed_lecturer`,
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

    const data: assignment[] = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    const data: assignment[] = [];
    return data;
  }
}

export async function getAllowedAssignments(): Promise<assignment[]> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/assignment/list_allowed_lecturer`,
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

    const data: assignment[] = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    const data: assignment[] = [];
    return data;
  }
}

export async function getModuleAssignments(
  code: string,
): Promise<assignment[]> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/assignment/list_module_assignments/${code}/`,
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
export async function createAssignment(data: {
  subject: string;
  name: string;
  due_date: Date;
  marks?: number;
  assignment_info?: string;
}) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/assignment/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify(data),
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

//Update assignment
export async function updateAssignment(
  data: {
    subject: string;
    name: string;
    due_date: Date;
    marks?: number;
    assignment_info?: string;
  },
  id: number,
) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/assignment/${id}/edit/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify(data),
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

//Delete assignment
export async function deleteAssignment(assignment: assignment) {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/assignment/${assignment.id}/delete/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      },
    );

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status} - ${response.statusText}`,
      );
    }
  } catch (error) {
    console.error("An error occurred while deleting feedback:", error);
    throw error;
  }
}
