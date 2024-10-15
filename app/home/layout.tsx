"use server";

import { Breadcrumbs } from "@/components/breadcrums/breadcrums";
import { UserSidebar } from "@/components/home-page/user-sidebar";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import { getLecturerModules } from "@/lib/actions/userRequests";
import { getUser } from "@/lib/session";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getUser();
  const modules = await getLecturerModules();

  return (
    <SidebarLayout
      defaultOpen={cookies().get("sidebar:state")?.value === "true"}
    >
      <UserSidebar user={user} modules={modules} />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md border-2 border-dashed p-2">
          <SidebarTrigger />
          <Breadcrumbs />
          {children}
        </div>
      </main>
    </SidebarLayout>
  );
}
