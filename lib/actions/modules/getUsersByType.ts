"use server";

import { DjangoUser } from "@/components/admin-dashboard/types";
import { getToken } from "@/lib/session";

type Response =
  | { users: DjangoUser[]; errors?: never }
  | { students?: never; errors: { detail?: string } };

export async function getUsersByType(
  type: "lecturers" | "students"
): Promise<Response> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/list/${type}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        users: data,
      };
    } else {
      return {
        errors: {
          detail: data.detail,
        },
      };
    }
  } catch (error) {
    console.log(error);
    return {
      errors: {
        detail: "An unexpected error occurred",
      },
    };
  }
}
