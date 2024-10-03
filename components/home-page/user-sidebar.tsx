"use client";

import { AppSidebar } from "../side-nav/app-sidebar";

import {
  Bird,
  BookOpen,
  Bot,
  Code2,
  History,
  LifeBuoy,
  Rabbit,
  Send,
  Settings2,
  SquareTerminal,
  Star,
  Turtle,
} from "lucide-react";

const nav = {
  main: [
    {
      title: "My Assignments",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
          icon: History,
          description: "View your recent prompts",
        },
        {
          title: "Starred",
          url: "#",
          icon: Star,
          description: "Browse your starred prompts",
        },
        {
          title: "Settings",
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
