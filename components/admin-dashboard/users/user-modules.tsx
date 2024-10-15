import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";
import { getUserModules } from "@/lib/actions/users/getUserModules";
import { Row } from "./row";

export async function UserModules({ username }: { username: string }) {
  const response = await getUserModules(username);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modules</CardTitle>
        <CardDescription>Modules relevant to this user</CardDescription>
      </CardHeader>
      <CardContent>
        {response.errors ? (
          <div className="flex flex-col gap-1">
            <p>Errors encountered</p>
            <div className="bg-neutral-50 border-l-4 shadow border-l-red-500 rounded-md p-4">
              {response.errors.detail}
            </div>
          </div>
        ) : (
          <ul>
            {response.modules.map((mod, i) => (
              <Row key={mod.code} noBorder={i === 0}>
                {mod.code}
              </Row>
            ))}
          </ul>
        )}
      </CardContent>
      <CardFooter>
        <Button className="mr-2" asChild>
          <Link href={`/admin/dashboard/users/modules/${username}`}>
            Edit modules
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
