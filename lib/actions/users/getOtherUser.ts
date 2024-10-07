"use server";

import { getToken } from "@/lib/session";

type GetResponse = {
  user?: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  errors?: {
    detail?: string;
  };
};

export async function getOtherUser(username: string): Promise<GetResponse> {
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
        detail: "An unexpected error occured",
      },
    };
  }
}
