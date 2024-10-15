import { Eye, Plus, Upload } from "lucide-react";

export const navItems = {
  users: [
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
  ],
  modules: [
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
  ],
  assignments: [
    {
      title: "View assignments",
      href: "/admin/dashboard/assignments/view",
      icon: <Eye size={21} />,
    },
    {
      title: "View submissions",
      href: "/admin/dashboard/assignments/submissions/",
      icon: <Eye size={21} />,
    },
  ],
  logs: [
    {
      title: "View logs",
      href: "/admin/dashboard/logs",
      icon: <Eye size={21} />,
    },
  ],
};
