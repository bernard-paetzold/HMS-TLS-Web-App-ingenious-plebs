"use server";

import { User, DjangoUser } from "@/components/admin-dashboard/types";

import { getToken } from "@/lib/session";

type Response =
  | { user: User; errors?: never }
  | { user?: never; errors: { detail?: string } };

export async function getOtherUser(username: string): Promise<Response> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/edit/${username}/`,
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

export async function getOtherUserById(id: number): Promise<DjangoUser | null> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/get/${id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      }
    );

    if (!response.ok) {
      if (response.status === 404) {
        // User not found
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: DjangoUser = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    return null;
  }
}
