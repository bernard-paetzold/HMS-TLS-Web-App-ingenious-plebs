"use server";

import { Module } from "@/components/admin-dashboard/types";
import { getToken } from "@/lib/session";

type Response =
  | { modules: Module[]; errors?: never }
  | { modules?: never; errors: { detail?: string } };

export async function getAllModules(): Promise<Response> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/module/list/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
    });

    const data = await response.json();

    if (response.ok) {
      return {
        modules: data,
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
