import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-screen p-4 flex justify-center items-center flex-col gap-4">
      <h2 className="text-4xl">Not Found</h2>
      <p className="text-lg">
        The page you&apos;re looking for doesn&apos;t exist
      </p>
      <Button className="text-base" asChild>
        <Link href="/">Take me back</Link>
      </Button>
    </div>
  );
}
