import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUserModules } from "@/lib/actions/users/getUserModules";

export default async function ModuleTable({ username }: { username: string }) {
  const response = await getUserModules(username);

  if (response.errors) {
    return (
      <div className="flex flex-col gap-1">
        <p>Errors encountered</p>
        <p className="bg-neutral-50 border-l-4 shadow border-l-red-500 rounded-md p-4">
          {response.errors.detail}
        </p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>Modules assigned to {username}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Module</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {response.modules.map((mod) => (
          <TableRow key={mod.code}>
            <TableCell className="font-medium">{mod.code}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
