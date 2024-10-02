"use server";

import { redirect } from "next/navigation";
import { deleteToken, getToken } from "../token";

export async function logoutRequest() {
  let success = false;

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken() as string,
      },
    });

    if (response.ok) {
      deleteToken();
      success = true;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (success) redirect("/login");
  }
}
