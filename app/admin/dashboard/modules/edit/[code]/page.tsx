import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";

import { Suspense } from "react";
import Fallback from "@/components/admin-dashboard/fallback/fallback";
import { getModule } from "@/lib/actions/modules/getModule";
import EditModuleForm from "@/components/admin-dashboard/modules/edit-module-form";

export default async function Page({ params }: { params: { code: string } }) {
  return (
    <Suspense fallback={<Fallback />}>
      <EditModuleWrapper code={params.code} />
    </Suspense>
  );
}

async function EditModuleWrapper({ code }: { code: string }) {
  const data = await getModule(code);

  if (data.errors) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{data.errors.detail}</CardTitle>
        </CardHeader>
        <CardFooter>
          <Button asChild>
            <Link href={"/admin/dashboard/modules/view"}>Take me back</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return <EditModuleForm code={code} />;
}
