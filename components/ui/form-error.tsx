import { ReactNode } from "react";

export function FormError({ children }: { children: ReactNode }) {
  return <span className="text-red-500 block text-sm">{children}*</span>;
}
