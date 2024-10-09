import { BaseSyntheticEvent, Dispatch, SetStateAction } from "react";

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
};

export type DjangoUser = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  is_active: boolean;
};

export type UserFieldErrors = {
  fields?: {
    username?: string[] | undefined;
    firstName?: string[] | undefined;
    lastName?: string[] | undefined;
    email?: string[] | undefined;
    role?: string[] | undefined;
    password?: string[] | undefined;
  };
  detail?: string;
};

export type UserFormErrors = {
  fields: {
    username?: string[] | undefined;
    firstName?: string[] | undefined;
    lastName?: string[] | undefined;
    email?: string[] | undefined;
    role?: string[] | undefined;
    password?: string[] | undefined;
    passwordConfirm?: string[] | undefined;
  } | null;
  detail: string | null;
};

export type UserEditSubmit = (
  e: BaseSyntheticEvent,
  content: "info" | "password",
  setIsLoading: Dispatch<SetStateAction<boolean>>
) => Promise<void>;

export type UserRow = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};
