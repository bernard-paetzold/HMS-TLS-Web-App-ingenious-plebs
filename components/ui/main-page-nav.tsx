import Link from "next/link";
import { ReactNode } from "react";

type Nav = {
  title: string;
  href: string;
  icon: ReactNode;
}[];

export default function MainPageNav({ nav }: { nav: Nav }) {
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
