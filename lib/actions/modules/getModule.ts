"use server";

import { Module } from "@/components/admin-dashboard/types";
import { getToken } from "@/lib/session";

type Response =
  | { data: Module; errors?: never }
  | {
      data?: never;
      errors: { detail?: string };
    };

export async function getModule(code: string): Promise<Response> {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/module/details/${code}/`,
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
        data: data,
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
