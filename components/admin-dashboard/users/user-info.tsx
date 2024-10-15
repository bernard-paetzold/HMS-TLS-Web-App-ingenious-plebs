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
import { User } from "@/components/admin-dashboard/types";
import { Row } from "./row";

export function UserInfo({ username, user }: { username: string; user: User }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Username: {username}</CardTitle>
        <CardDescription>View user&apos;s information</CardDescription>
      </CardHeader>
      <CardContent>
        <ul>
          <Row noBorder>ID: {user.id}</Row>
          <Row>Username: {user.username}</Row>
          <Row>First name: {user.firstName}</Row>
          <Row>Last name: {user.lastName}</Row>
          <Row>Email: {user.email}</Row>
          <Row>Role: {user.role}</Row>
          <Row>Activated: {user.isActive ? "Yes" : "No"}</Row>
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="mr-2" asChild>
          <Link href={`/admin/dashboard/users/edit/${user.username}`}>
            Edit user
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
