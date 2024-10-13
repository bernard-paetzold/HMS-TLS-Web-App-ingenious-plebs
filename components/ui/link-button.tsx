"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LinkButton({
  title,
  target,
}: {
  title: string;
  target: string;
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(target);
  };

  return <Button onClick={handleClick}>{title}</Button>;
}
