import { cookies } from "next/headers";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
};

type Session = {
  token: string;
  user: User;
};

export function setSession(token: string, user: User) {
  const data = {
    token: `Token ${token}`,
    user: user,
  };

  cookies().set({
    name: "user-session",
    value: JSON.stringify(data),
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 7200,
  });
}

export function getSession() {
  return cookies().get("user-session")?.value;
}

export function deleteSession() {
  return cookies().delete("user-session");
}

// Only use below methods if a session exists
export function getUser() {
  return (JSON.parse(cookies().get("user-session")?.value as string) as Session)
    .user;
}

export function getToken() {
  return (JSON.parse(cookies().get("user-session")?.value as string) as Session)
    .token;
}
