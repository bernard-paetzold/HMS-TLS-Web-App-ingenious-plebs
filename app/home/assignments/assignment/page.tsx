"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AssignmentPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the assignments page
    router.push("/home/assignments");
  }, [router]);
  return null;
}
