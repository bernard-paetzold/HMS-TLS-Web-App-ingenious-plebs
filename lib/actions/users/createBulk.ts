"use server";

import { DjangoUser } from "@/components/admin-dashboard/types";
import { getToken } from "@/lib/session";
import { z } from "zod";

type Response =
  | { users: DjangoUser[]; errors?: never }
  | { users?: never; errors: { detail?: string } };

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()\[\]{};':"\\|,.<>\/`~\-=+]).{8,}$/
);

export async function createBulk(data: string): Promise<Response> {
  const schema = z
    .object({
      username: z.coerce
        .string()
        .min(1, { message: "Must be at least 1 character" }),
      first_name: z.coerce
        .string()
        .min(1, { message: "Must have at least 1 character" }),
      last_name: z.coerce
        .string()
        .min(1, { message: "Must have at least 1 character" }),
      email: z.coerce
        .string()
        .min(1, { message: "Must have at least 1 character" })
        .email({ message: "Must be a valid email" }),
      role: z.union([z.literal("student"), z.literal("lecturer")]),
      password: z.coerce
        .string()
        .regex(passwordValidation, { message: "Invalid password" }),
    })
    .array();

  // Validate input fields on server
  const validatedFields = schema.safeParse(JSON.parse(data));

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      errors: { detail: JSON.stringify(fieldErrors, undefined, 2) },
    };
  }

  if (validatedFields.data.length === 0) {
    return {
      errors: {
        detail: "Empty data set",
      },
    };
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/create-bulk/`,
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
        users: data as DjangoUser[],
      };
    } else {
      return {
        errors: {
          detail: JSON.stringify(data, undefined, 2),
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
