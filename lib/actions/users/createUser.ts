"use server";

import { User, UserFieldErrors } from "@/components/admin-dashboard/types";
import { getToken } from "@/lib/session";
import { z } from "zod";

type Response =
  | { user: User; errors?: never }
  | { user?: never; errors: UserFieldErrors };

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()\[\]{};':"\\|,.<>\/`~\-=+]).{8,}$/
);

export async function createUser(formData: FormData): Promise<Response> {
  const schema = z.object({
    username: z.string().min(1, { message: "Must be at least 1 character" }),
    first_name: z
      .string()
      .min(1, { message: "Must have at least 1 character" }),
    last_name: z.string().min(1, { message: "Must have at least 1 character" }),
    email: z
      .string()
      .min(1, { message: "Must have at least 1 character" })
      .email({ message: "Must be a valid email" }),
    role: z.union([z.literal("student"), z.literal("lecturer")]),
    password: z
      .string()
      .regex(passwordValidation, { message: "Invalid password" }),
  });

  // Validate input fields on server
  const validatedFields = schema.safeParse({
    username: formData.get("username"),
    first_name: formData.get("firstName"),
    last_name: formData.get("lastName"),
    email: formData.get("email"),
    role: formData.get("role"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: { fields: validatedFields.error.flatten().fieldErrors },
    };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getToken(),
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await response.json();

    if (response.ok) {
      return {
        user: {
          id: data.id,
          username: data.username,
          firstName: data.first_name,
          lastName: data.last_name,
          email: data.email,
          role: data.role,
          isActive: data.is_active,
        },
      };
    } else if (response.status === 400 && data.username) {
      return {
        errors: {
          detail: data.username[0],
        },
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
