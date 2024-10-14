import AssignModulesCard from "@/components/admin-dashboard/users/assign-modules-card";
import UserModulesCard from "@/components/admin-dashboard/users/user-modules-card";

export default function Page({ params }: { params: { username: string } }) {
  return (
    <div className="flex flex-col gap-4">
      <UserModulesCard username={params.username} />
      <AssignModulesCard username={params.username} />
    </div>
  );
}
