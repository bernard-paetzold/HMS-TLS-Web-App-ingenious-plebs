"use client";

import { AppSidebar } from "../side-nav/app-sidebar";

import {
  History,
  LifeBuoy,
  Send,
  Settings2,
  SquareTerminal,
  Star,
} from "lucide-react";

const nav = {
  main: [
    {
      title: "Home",
      url: "/home",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "My Assignments",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Create new assignment",
          url: "/home/assignments/create",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Browse assignments",
          url: "/home/assignments",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "History",
          url: "#",
          icon: Settings2,
          description: "Configure your playground",
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

export function UserSidebar({
  user,
}: {
  user: {
    username: string;
    email: string;
  };
}) {
  return <AppSidebar user={user} nav={nav} />;
}
