import { getOwnUser } from "@/lib/actions/users/getOwnUser";
import { Suspense } from "react";
import Fallback from "@/components/admin-dashboard/fallback/fallback";
import EditOwnForm from "@/components/admin-dashboard/users/edit-own-form";

export default async function Page() {
  return (
    <Suspense fallback={<Fallback />}>
      <EditFormWrapper />
    </Suspense>
  );
}

async function EditFormWrapper() {
  const data = await getOwnUser();

  return <EditOwnForm data={data} />;
}
