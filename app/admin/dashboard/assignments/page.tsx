import { Eye } from "lucide-react";
import MainPageNav from "@/components/ui/main-page-nav";

export default function Page() {
  const nav = [
    {
      title: "View assignments",
      href: "/admin/dashboard/assignments/view",
      icon: <Eye size={21} />,
    },
  ];

  return <MainPageNav nav={nav} />;
}
