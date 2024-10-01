"use server";

import { z } from "zod";
import { setToken } from "../auth";
import { redirect } from "next/navigation";

type LoginResponse = {
  errors: {
    fields?: {
      username?: string[] | undefined;
      password?: string[] | undefined;
    };
    credentials?: string;
    other?: string;
  };
};

export async function loginRequest(
  formData: FormData
): Promise<LoginResponse | undefined> {
  const schema = z.object({
    username: z.string().min(1, { message: "Must have at least 1 character" }),
    password: z.string().min(1, { message: "Must have at least 1 character" }),
  });

  // Validate input fields on server
  const validatedFields = schema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: { fields: validatedFields.error.flatten().fieldErrors },
    };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedFields.data),
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
    } else if (response.status === 400) {
      return {
        errors: {
          credentials: data.non_field_errors[0],
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
  } finally {
    // Invokes middleware to redirect user to correct dashboard
    redirect("/login");
  }
}
