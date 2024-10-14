import { Eye, Plus } from "lucide-react";
import MainPageNav from "@/components/ui/main-page-nav";

export default function Page() {
  const nav = [
    {
      title: "View modules",
      href: "/admin/dashboard/modules/view",
      icon: <Eye size={21} />,
    },
    {
      title: "Add a module",
      href: "/admin/dashboard/users/add",
      icon: <Plus size={21} />,
    },
  ];

  return <MainPageNav nav={nav} />;
}
