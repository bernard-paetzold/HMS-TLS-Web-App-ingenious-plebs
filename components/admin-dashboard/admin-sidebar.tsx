"use client";

import { AppSidebar } from "../side-nav/app-sidebar";

import {
  BookOpen,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
  User,
  Clapperboard,
  Box,
} from "lucide-react";

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
          // icon: History,
          description: "View users",
        },
        {
          title: "Add",
          url: `${rootURL}/users/add`,
          // icon: History,
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
          // icon: History,
          description: "View modules",
        },
        {
          title: "Add",
          url: `${rootURL}/modules/add`,
          // icon: History,
          description: "Add a module",
        },
      ],
    },
    {
      title: "Assignments",
      url: `${rootURL}/assignments`,
      icon: BookOpen,
      items: [
        {
          title: "View",
          url: "#",
          // icon: History,
          description: "View assignments",
        },
        {
          title: "Add",
          url: "#",
          // icon: History,
          description: "Create an assignment",
        },
      ],
    },
    {
      title: "Submissions",
      url: `${rootURL}/submissions`,
      icon: Clapperboard,
      items: [
        {
          title: "View",
          url: "#",
          // icon: History,
          description: "View submissions",
        },
        {
          title: "Add",
          url: "#",
          // icon: History,
          description: "Create a submission",
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
          url: "#",
          // icon: History,
          description: "View logs",
        },
      ],
    },
    {
      title: "Settings",
      url: `${rootURL}/settings`,
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
      ],
    },
  ],
  secondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
};

export function AdminSidebar({
  user,
}: {
  user: {
    username: string;
    email: string;
  };
}) {
  return <AppSidebar user={user} nav={nav} />;
}
