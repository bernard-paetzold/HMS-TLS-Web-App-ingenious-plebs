import MainPageNav from "@/components/ui/main-page-nav";
import { navItems } from "@/components/admin-dashboard/nav-items";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(navItems).map(([title, nav]) => (
        <div key={title}>
          <h2 className="text-2xl font-semibold mb-1">
            {title[0].toUpperCase() + title.substring(1)}
          </h2>
          <MainPageNav nav={nav} />
        </div>
      ))}
    </div>
  );
}
