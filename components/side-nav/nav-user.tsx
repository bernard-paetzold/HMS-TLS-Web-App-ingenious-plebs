import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logoutRequest } from "@/lib/actions/logoutRequest";
import Link from "next/link";
import { User } from "../admin-dashboard/types";

export function NavUser({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-full rounded-md outline-none ring-neutral-950 hover:bg-neutral-100 focus-visible:ring-2 data-[state=open]:bg-neutral-100 dark:ring-neutral-300 dark:hover:bg-neutral-800 dark:data-[state=open]:bg-neutral-800">
        <div className="flex items-center gap-2 px-2 py-1.5 text-left text-sm transition-all">
          <Avatar className="h-7 w-7 rounded-md border">
            <AvatarFallback className="rounded-md">
              {user.username.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 leading-none">
            <div className="font-medium">{user.username}</div>
            <div className="overflow-hidden text-xs text-neutral-500 dark:text-neutral-400">
              <div className="line-clamp-1">{user.email}</div>
            </div>
          </div>
          <ChevronsUpDown className="ml-auto mr-0.5 h-4 w-4 text-neutral-500/50 dark:text-neutral-400/50" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56"
        align="end"
        side="right"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm transition-all">
            <Avatar className="h-7 w-7 rounded-md">
              <AvatarFallback>
                {user.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1">
              <div className="font-medium">{user.username}</div>
              <div className="overflow-hidden text-xs text-neutral-500 dark:text-neutral-400">
                <div className="line-clamp-1">{user.email}</div>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href={
                user.role === "admin"
                  ? "/admin/dashboard/account/"
                  : "/home/account/"
              }
            >
              <BadgeCheck className="mr-2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2"
          onClick={async () => {
            await logoutRequest();
          }}
        >
          <LogOut className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
