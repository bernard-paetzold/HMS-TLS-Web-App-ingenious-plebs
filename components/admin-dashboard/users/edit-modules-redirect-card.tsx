import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function EditModulesRedirectCard({
  username,
}: {
  username: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Modules</CardTitle>
        <CardDescription>Link to update user&apos;s modules</CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild>
          <Link href={`/admin/dashboard/users/modules/${username}`}>
            Update modules
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
