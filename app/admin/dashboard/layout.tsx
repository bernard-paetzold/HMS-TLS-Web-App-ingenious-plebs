import { AdminSidebar } from "@/components/admin-dashboard/admin-sidebar";
import { Breadcrumbs } from "@/components/breadcrums/breadcrums";
import { SidebarLayout, SidebarTrigger } from "@/components/ui/sidebar";
import { getUser } from "@/lib/session";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = getUser();

  return (
    <SidebarLayout
      defaultOpen={cookies().get("sidebar:state")?.value === "true"}
    >
      <AdminSidebar user={user} />
      <main className="flex flex-1 flex-col p-2 transition-all duration-300 ease-in-out">
        <div className="h-full rounded-md border-2 border-dashed p-2">
          <div className="flex flex-row gap-2 items-center">
            <SidebarTrigger />
            <Breadcrumbs />
          </div>
          {children}
        </div>
      </main>
    </SidebarLayout>
  );
}
