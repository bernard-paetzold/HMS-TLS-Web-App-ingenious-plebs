"use client";

import { BrainCog, LucideIcon } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavSecondary } from "@/components/side-nav/nav-secondary";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
import { OrganisationSwitcher } from "./sidebar-header";
const data = {
  organisations: [
    {
      name: "HMS TLS",
      logo: BrainCog,
      plan: "",
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
        <OrganisationSwitcher organisations={data.organisations} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Navigation</SidebarLabel>
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
