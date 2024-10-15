"use client";

import { LucideIcon } from "lucide-react";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar";
import { Header } from "./header";
import { User } from "../admin-dashboard/types";

export function AppSidebar({
  user,
  nav,
}: {
  user: User;
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
  };
}) {
  return (
    <Sidebar>
      <SidebarHeader>
        <Header />
      </SidebarHeader>
      <SidebarContent>
        <SidebarItem>
          <SidebarLabel>Navigation</SidebarLabel>
          <NavMain items={nav.main} />
        </SidebarItem>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
