"use server";

import { module } from "../definitions";
import { getToken } from "../session";

export async function getLecturerModules(): Promise<module[]> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/lecturer/modules/`,
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

    const data: module[] = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    const data: module[] = [];
    return data;
  }
}
