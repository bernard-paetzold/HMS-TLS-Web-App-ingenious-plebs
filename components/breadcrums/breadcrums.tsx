"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Breadcrumbs() {
  const pathname = usePathname();
  const [sections, setSections] = useState<string[]>([]);

  useEffect(() => {
    setSections(pathname.split("/").slice(1));
  }, [pathname]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {sections.map((section, i) => (
          <>
            {i > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {i + 1 !== sections.length ? (
                <BreadcrumbLink href={`/${sections.slice(0, i + 1).join("/")}`}>
                  {section}
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>{section}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
