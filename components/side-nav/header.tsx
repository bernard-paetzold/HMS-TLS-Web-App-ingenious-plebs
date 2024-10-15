import { BrainCog } from "lucide-react";

export function Header() {
  const data = {
    name: "HMS TLS",
    logo: BrainCog,
    plan: "",
  };

  return (
    <div className="flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-left text-sm transition-all">
      <div className="flex h-5 w-5 items-center justify-center rounded-sm bg-neutral-900 text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900">
        <data.logo className="h-3.5 w-3.5 shrink-0" />
      </div>
      <div className="line-clamp-1 flex-1 pr-2 font-medium">{data.name}</div>
    </div>
  );
}
