"use server";

type Response =
  | {
      logs: {
        id: number;
        t_stamp: string; // ISO 8601 format date-time string
        token: string;
        event_origin: string;
        extra: {
          activity: string;
          ip_address: string;
          user_agent: string;
        };
      }[];
      errors?: never;
    }
  | {
      logs?: never;
      errors: { detail?: string };
    };

export async function getLogs(
  startDate: Date | string,
  endDate: Date | string
): Promise<Response> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/event_log/logs/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_date: startDate,
        end_date: endDate,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return { logs: data };
    } else {
      const errorMessage = await response.text();
      return { errors: { detail: errorMessage } };
    }
  } catch (error) {
    console.log(error);
    return { errors: { detail: "An unexpected error occurred" } };
  }
}
