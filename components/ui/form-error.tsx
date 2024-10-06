import { ReactNode } from "react";

export function FormError({ children }: { children: ReactNode }) {
  return <span className="text-red-500">{children}*</span>;
}
