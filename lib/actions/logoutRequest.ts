"use server";

import { redirect } from "next/navigation";
import { deleteSession, getToken } from "../session";

export async function logoutRequest() {
  let success = false;

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });

    if (response.ok) {
      deleteSession();
      success = true;
    }
  } catch (error) {
    console.log(error);
  } finally {
    if (success) redirect("/login");
  }
}
