import AddUserForm from "@/components/admin-dashboard/users/add-user-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Page() {
  return (
    <Tabs defaultValue="single">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="single">Single</TabsTrigger>
        <TabsTrigger value="bulk">Bulk</TabsTrigger>
      </TabsList>
      <TabsContent value="single">
        <AddUserForm />
      </TabsContent>
      {/* todo  */}
      <TabsContent value="bulk">Create bulk</TabsContent>
    </Tabs>
  );
}
