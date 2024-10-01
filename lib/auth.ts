import { cookies } from "next/headers";

export function setToken(token: string) {
  cookies().set({
    name: "token",
    value: `Token ${token}`,
    httpOnly: true,
    secure: true,
    maxAge: 7200,
  });
}

export function getToken() {
  return cookies().get("token")?.value;
}

export function deleteToken() {
  return cookies().delete("token");
}
