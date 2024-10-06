"use server";

import { getToken } from "@/lib/session";
import { z } from "zod";

type CreateResponse = {
  user?: {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
  errors?: {
    fields?: {
      username?: string[] | undefined;
      firstName?: string[] | undefined;
      lastName?: string[] | undefined;
      email?: string[] | undefined;
      role?: string[] | undefined;
      password?: string[] | undefined;
    };
    authorization?: string;
    other?: string;
  };
};

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

export async function createUser(formData: FormData): Promise<CreateResponse> {
  const schema = z.object({
    username: z.string().min(1, { message: "Must have at least 1 character" }),
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
        },
      };
    } else if (response.status === 400 && data.username) {
      return {
        errors: {
          other: data.username[0],
        },
      };
    } else if (response.status === 401) {
      return {
        errors: {
          authorization: data.detail,
        },
      };
    } else {
      // Unexpected error occured
      throw Error(JSON.stringify(data));
    }
  } catch (error) {
    console.log(error);
    return {
      errors: {
        other: "An unexpected error occured",
      },
    };
  }
}
