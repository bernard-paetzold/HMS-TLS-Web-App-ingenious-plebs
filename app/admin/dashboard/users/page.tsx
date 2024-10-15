import { navItems } from "@/components/admin-dashboard/nav-items";
import MainPageNav from "@/components/ui/main-page-nav";

export default function Page() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">Users</h2>
      <MainPageNav nav={navItems.users} />
    </div>
  );
}
