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

export async function updateUser(
  formData: FormData,
  content: "info" | "password",
  username: string
): Promise<Response> {
  const empty = z
    .string()
    .length(0)
    .transform((x) => x || undefined);

  const infoSchema = z.object({
    username: z.union([
      z.string().min(1, { message: "Must be at least 1 character" }),
      empty,
    ]),
    first_name: z.string().transform((x) => x || undefined),
    last_name: z.string().transform((x) => x || undefined),
    email: z.union([
      z.string().email({ message: "Must be a valid email" }),
      empty,
    ]),
    role: z.union([z.literal("student"), z.literal("lecturer"), empty]),
  });

  const passwordSchema = z
    .object({
      password: z.union([
        z.string().regex(passwordValidation, { message: "Invalid password" }),
        empty,
      ]),
      passwordConfirm: z.union([
        z.string().regex(passwordValidation, { message: "Invalid password" }),
        empty,
      ]),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    });

  // Validate input fields on server
  const validatedFields =
    content === "info"
      ? infoSchema.safeParse({
          username: formData.get("username"),
          first_name: formData.get("firstName"),
          last_name: formData.get("lastName"),
          email: formData.get("email"),
          role: formData.get("role"),
        })
      : passwordSchema.safeParse({
          password: formData.get("password"),
          passwordConfirm: formData.get("passwordConfirm"),
        });

  if (!validatedFields.success) {
    return {
      errors: { fields: validatedFields.error.flatten().fieldErrors },
    };
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/edit/${username}/`,
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
