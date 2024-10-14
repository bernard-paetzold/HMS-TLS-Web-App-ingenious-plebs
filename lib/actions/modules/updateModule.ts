"use server";

import { Module, ModuleFieldErrors } from "@/components/admin-dashboard/types";
import { getToken } from "@/lib/session";
import { z } from "zod";

type Response =
  | { data: Module; errors?: never }
  | {
      data?: never;
      errors: ModuleFieldErrors;
    };

export async function updateModule(
  formData: FormData,
  code: string
): Promise<Response> {
  const schema = z.object({
    code: z.string().length(7, { message: "Must be 7 characters" }),
  });

  // Validate input fields on server
  const validatedFields = schema.safeParse({
    code: formData.get("code"),
  });

  if (!validatedFields.success) {
    return {
      errors: { fields: validatedFields.error.flatten().fieldErrors },
    };
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/module/edit/${code}/`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify(validatedFields.data),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return { data: data };
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
