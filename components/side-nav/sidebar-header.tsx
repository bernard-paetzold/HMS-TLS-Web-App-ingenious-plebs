"use client";

import * as React from "react";
import { ChevronsUpDown, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OrganisationSwitcher({
  organisations,
}: {
  organisations: {
    name: string;
    logo: React.ElementType;
  }[];
}) {
  const [activeOrganisation, setActiveOrganisation] = React.useState(
    organisations[0],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full rounded-md ring-neutral-950 hover:bg-neutral-100 hover:text-neutral-900 focus-visible:outline-none focus-visible:ring-2 data-[state=open]:bg-neutral-100 dark:ring-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-50 dark:data-[state=open]:bg-neutral-800">
        <div className="flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-left text-sm transition-all">
          <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900">
            <activeOrganisation.logo className="h-3.5 w-3.5 shrink-0" />
          </div>
          <div className="line-clamp-1 flex-1 pr-2 font-medium">
            {activeOrganisation.name}
          </div>
          <ChevronsUpDown className="ml-auto h-4 w-4 text-neutral-500/50 dark:text-neutral-400/50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64"
        align="start"
        side="right"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-neutral-500 dark:text-neutral-400">
          Organisations
        </DropdownMenuLabel>
        {organisations.map((organisation, index) => (
          <DropdownMenuItem
            key={organisation.name}
            onClick={() => setActiveOrganisation(organisation)}
            className="items-start gap-2 px-1.5"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900">
              <organisation.logo className="h-5 w-5 shrink-0" />
            </div>
            <div className="grid flex-1 leading-tight">
              <div className="line-clamp-1 font-medium">
                {organisation.name}
              </div>
              <div className="overflow-hidden text-xs text-neutral-500 dark:text-neutral-400">
                <div className="line-clamp-1">{organisation.plan}</div>
              </div>
            </div>
            <DropdownMenuShortcut className="self-center">
              ⌘{index + 1}
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 px-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
            <Plus className="h-5 w-5" />
          </div>
          <div className="font-medium text-neutral-500 dark:text-neutral-400">
            Add workspace
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
