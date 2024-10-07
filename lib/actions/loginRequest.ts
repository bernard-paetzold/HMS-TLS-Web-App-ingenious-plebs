"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { setSession } from "../session";

type LoginResponse = {
  errors: {
    fields?: {
      username?: string[] | undefined;
      password?: string[] | undefined;
    };
    detail?: string;
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

  let success = false;
  let role = "";

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
      const newResponse = await fetch(
        `${process.env.BACKEND_URL}/users/edit/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${data.token}`,
          },
        }
      );

      const newData = await newResponse.json();

      if (newResponse.ok) {
        // Students are denied access
        if (newData.role === "student") {
          await fetch(`${process.env.BACKEND_URL}/auth/logout/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${data.token}`,
            },
          });
          return {
            errors: {
              detail: "Students may not use this service",
            },
          };
        }

        setSession(data.token, {
          id: newData.id,
          username: newData.username,
          firstName: newData.first_name,
          lastName: newData.last_name,
          email: newData.email,
          role: newData.role,
        });
        success = true;
        role = newData.role;
      } else {
        // Unexpected error occured
        throw Error(JSON.stringify(newData));
      }
    } else if (response.status === 400) {
      return {
        errors: {
          detail: data.non_field_errors[0],
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
        detail: "An unexpected error occured",
      },
    };
  } finally {
    if (success) {
      redirect(
        role === "admin"
          ? "/admin/dashboard"
          : role === "lecturer"
          ? "/dashboard"
          : "/login"
      );
    }
  }
}
