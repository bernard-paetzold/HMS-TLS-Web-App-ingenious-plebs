import AddLecturerForm from "@/components/admin-dashboard/modules/add-lecturer-form";
import AddStudentForm from "@/components/admin-dashboard/modules/add-student-form";
import { Module } from "@/components/admin-dashboard/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page({
  params,
  searchParams,
}: {
  params: Module;
  searchParams: { type: string };
}) {
  return (
    <Tabs
      defaultValue={searchParams.type === "student" ? "student" : "lecturer"}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="student">Student</TabsTrigger>
        <TabsTrigger value="lecturer">Lecturer</TabsTrigger>
      </TabsList>
      <TabsContent value="student">
        <AddStudentForm code={params.code} />
      </TabsContent>
      <TabsContent value="lecturer">
        <AddLecturerForm code={params.code} />
      </TabsContent>
    </Tabs>
  );
}
