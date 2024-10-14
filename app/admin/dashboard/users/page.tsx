import { Eye, Plus, Upload } from "lucide-react";
import MainPageNav from "@/components/ui/main-page-nav";

export default function Page() {
  const nav = [
    {
      title: "View users",
      href: "/admin/dashboard/users/view",
      icon: <Eye size={21} />,
    },
    {
      title: "Add a user",
      href: "/admin/dashboard/users/add",
      icon: <Plus size={21} />,
    },
    {
      title: "Upload users",
      href: "/admin/dashboard/users/add?bulk=true",
      icon: <Upload size={21} />,
    },
  ];

  return <MainPageNav nav={nav} />;
}
