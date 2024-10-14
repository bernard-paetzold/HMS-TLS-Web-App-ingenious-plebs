"use server";

import { getToken } from "@/lib/session";
import { z } from "zod";

type Response =
  | { detail: string; errors?: never }
  | {
      data?: never;
      errors: {
        fields?: {
          lecturer_id?: string[] | undefined;
          module_code?: string[] | undefined;
        };
        detail?: string;
      };
    };

export async function addLecturerToModule(
  lecturerID: number,
  code: string
): Promise<Response> {
  const schema = z.object({
    lecturer_id: z.number(),
    module_code: z.string().length(7, { message: "Must be 7 characters" }),
  });

  // Validate input fields on server
  const validatedFields = schema.safeParse({
    lecturer_id: lecturerID,
    module_code: code,
  });

  if (!validatedFields.success) {
    return {
      errors: { fields: validatedFields.error.flatten().fieldErrors },
    };
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/module/add-lecturer/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getToken(),
        },
        body: JSON.stringify(validatedFields.data),
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        detail: data.message,
      };
    } else {
      return {
        errors: {
          detail: data.error,
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
