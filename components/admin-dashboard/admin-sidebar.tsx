"use client";

import { AppSidebar } from "../side-nav/app-sidebar";

import { BookOpen, SquareTerminal, User, Box } from "lucide-react";
import { User as UserType } from "./types";

const rootURL = "/admin/dashboard";
const nav = {
  main: [
    {
      title: "Users",
      url: `${rootURL}/users`,
      icon: User,
      isActive: true,
      items: [
        {
          title: "View",
          url: `${rootURL}/users/view`,
          description: "View users",
        },
        {
          title: "Add",
          url: `${rootURL}/users/add`,
          description: "Create users",
        },
      ],
    },
    {
      title: "Modules",
      url: `${rootURL}/modules`,
      icon: Box,
      items: [
        {
          title: "View",
          url: `${rootURL}/modules/view`,
          description: "View modules",
        },
        {
          title: "Add",
          url: `${rootURL}/modules/add`,
          description: "Add a module",
        },
      ],
    },
    {
      title: "Assignments",
      url: `${rootURL}/assignments/`,
      icon: BookOpen,
      items: [
        {
          title: "View all",
          url: `${rootURL}/assignments/view`,
          description: "View assignments",
        },
        {
          title: "Student submissions",
          url: `${rootURL}/assignments/submissions/`,
          description: "View subissions",
        },
      ],
    },
    {
      title: "Logs",
      url: `${rootURL}/logs`,
      icon: SquareTerminal,
      items: [
        {
          title: "View",
          url: `${rootURL}/logs/view`,
          description: "View logs",
        },
      ],
    },
  ],
};

export function AdminSidebar({ user }: { user: UserType }) {
  return <AppSidebar user={user} nav={nav} />;
}
