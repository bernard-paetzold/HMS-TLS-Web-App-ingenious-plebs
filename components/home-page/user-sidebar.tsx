"use client";

import { module } from "@/lib/definitions";
import { AppSidebar } from "../side-nav/app-sidebar";

import { History, Star, University, Component, Book } from "lucide-react";
import { User } from "../admin-dashboard/types";

export function UserSidebar({
  user,
  modules,
}: {
  user: User;
  modules: module[];
}) {
  return <AppSidebar user={user} nav={buildNav(modules)} />;
}

function buildNav(modules: module[]) {
  const nav = {
    main: [
      {
        title: "Home",
        url: "/home",
        icon: University,
        isActive: true,
      },
      {
        title: "Modules",
        url: "/home/modules",
        icon: Component,
        isActive: true,
        items: modules.map((module) => ({
          title: module.code,
          url: `/home/modules/${module.code}`,
        })),
      },
      {
        title: "Assignments",
        url: "#",
        icon: Book,
        isActive: true,
        items: [
          {
            title: "Create new assignment",
            url: "/home/assignments/create",
            icon: History,
            description: "Create a new assignment",
          },
          {
            title: "Browse all assignments",
            url: "/home/assignments",
            icon: Star,
            description: "Browse assignments from all modules",
          },
          {
            title: "Browse all submissions",
            url: "/home/submissions",
            icon: Star,
            description: "Browse submissions from all assignments",
          },
        ],
      },
    ],
  };

  return nav;
}
