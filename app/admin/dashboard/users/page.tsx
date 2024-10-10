import Link from "next/link";
import { Eye, Plus, Upload } from "lucide-react";

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

  return (
    <div className="flex flex-row gap-4 flex-wrap">
      {nav.map((action, i) => (
        <Link
          key={i}
          href={action.href}
          className="p-4 sm:w-60 rounded-md bg-white shadow w-full h-40 hover:-translate-y-1 transition-transform flex flex-row"
        >
          {action.icon}
          <h2 className="ml-1">{action.title}</h2>
        </Link>
      ))}
    </div>
  );
}
