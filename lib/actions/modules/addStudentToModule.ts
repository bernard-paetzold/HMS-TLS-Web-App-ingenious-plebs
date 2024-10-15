"use server";

import { getToken } from "@/lib/session";
import { z } from "zod";

type Response =
  | { detail: string; errors?: never }
  | {
      data?: never;
      errors: {
        fields?: {
          student_username?: string[] | undefined;
          module_code?: string[] | undefined;
        };
        detail?: string;
      };
    };

export async function addStudentToModule(
  username: string,
  code: string
): Promise<Response> {
  const schema = z.object({
    student_username: z
      .string()
      .min(1, { message: "Must be at least 1 character" }),
    module_code: z.string().length(7, { message: "Must be 7 characters" }),
  });

  // Validate input fields on server
  const validatedFields = schema.safeParse({
    student_username: username,
    module_code: code,
  });

  if (!validatedFields.success) {
    return {
      errors: { fields: validatedFields.error.flatten().fieldErrors },
    };
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/module/add-student/`,
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
        detail: "An unexpected error occurred",
      },
    };
  }
}
