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
  data,
}: {
  data: {
    user: {
      name: string;
      email: string;
    };
    navMain: {
      title: string;
      url: string;
      icon: LucideIcon;
      isActive?: boolean;
      items?: {
        title: string;
        url: string;
      }[];
    }[];
    navSecondary: {
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
          <NavMain items={data.navMain} />
        </SidebarItem>
        <SidebarItem className="mt-auto">
          {/* Might use down the line */}
          <SidebarLabel>Help</SidebarLabel>
          <NavSecondary items={data.navSecondary} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
