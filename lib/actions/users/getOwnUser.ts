"use server";

import { User } from "@/components/admin-dashboard/types";

import { getToken } from "@/lib/session";

type Response =
  | { user: User; errors?: never }
  | { user?: never; errors: { detail?: string } };

export async function getOwnUser(): Promise<Response> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/users/edit/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        user: {
          id: data.id,
          username: data.username,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          role: data.role,
          isActive: data.is_active,
        },
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
