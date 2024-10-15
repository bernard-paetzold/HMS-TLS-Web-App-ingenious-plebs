"use server";

import { getToken } from "@/lib/session";

type Response = {
  errors?: {
    detail?: string;
  };
};

export async function deleteUser(username: string): Promise<Response> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/delete/${username}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
      }
    );

    if (response.ok) {
      return {};
    } else {
      const data = await response.json();
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
