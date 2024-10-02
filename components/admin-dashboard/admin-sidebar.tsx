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
      title: "Playground",
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
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
          icon: Rabbit,
          description: "Our fastest model for general use cases.",
        },
        {
          title: "Explorer",
          url: "#",
          icon: Bird,
          description: "Performance and speed for efficiency.",
        },
        {
          title: "Quantum",
          url: "#",
          icon: Turtle,
          description: "The most powerful model for complex computations.",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "API",
      url: "#",
      icon: Code2,
      items: [
        {
          title: "Chat",
          url: "#",
        },
        {
          title: "Completion",
          url: "#",
        },
        {
          title: "Images",
          url: "#",
        },
        {
          title: "Video",
          url: "#",
        },
        {
          title: "Speech",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
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
