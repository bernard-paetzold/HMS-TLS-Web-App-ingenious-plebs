import MainPageNav from "@/components/ui/main-page-nav";
import { navItems } from "@/components/admin-dashboard/nav-items";

export default function Page() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-1">Assignments</h2>
      <MainPageNav nav={navItems.assignments} />
    </div>
  );
}
