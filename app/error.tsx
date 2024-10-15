"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen p-4 flex justify-center items-center flex-col gap-4">
      <h2 className="text-4xl">Something went wrong!</h2>
      <p className="text-lg">An unexpected error occurred</p>
      <Button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
      <Link className="underline underline-offset-2" href="/">
        Take me back
      </Link>
    </div>
  );
}
