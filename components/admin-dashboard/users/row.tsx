import { ReactNode } from "react";

export function Row({
  children,
  noBorder = false,
}: {
  children: ReactNode;
  noBorder?: boolean;
}) {
  return (
    <li className={`py-1 ${!noBorder && "border-t"}`} border-t>
      {children}
    </li>
  );
}
