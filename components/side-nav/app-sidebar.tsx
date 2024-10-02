"use client";

import { Atom, Eclipse, LucideIcon, Rabbit } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavSecondary } from "@/components/side-nav/nav-secondary";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "@/components/side-nav/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
const testData = {
  teams: [
    {
      name: "Acme Inc",
      logo: Atom,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: Eclipse,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Rabbit,
      plan: "Free",
    },
  ],
};

export function AppSidebar({
  user,
  nav,
}: {
  user: {
    username: string;
    email: string;
  };
  nav: {
    main: {
      title: string;
      url: string;
      icon: LucideIcon;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
    secondary: {
      title: string;
      url: string;
      icon: LucideIcon;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
  };
}) {
  return (
    <Sidebar>
      <SidebarHeader>
        {/* Might use down the line */}
        <TeamSwitcher teams={testData.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Platform</SidebarLabel>
          <NavMain items={nav.main} />
        </SidebarItem>
        <SidebarItem className="mt-auto">
          {/* Might use down the line */}
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={nav.secondary} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
