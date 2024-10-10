import { ReactNode } from "react";

export function FormError({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`${className || ""} text-red-500 block text-sm`}>
      {children}*
    </span>
  );
}
