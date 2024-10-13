import { getLecturerModules } from "@/lib/actions/userRequests";
import { ModuleCard } from "@/components/home-page/cards";
import { module } from "@/lib/definitions";

export default async function Page() {
  const modules: module[] = await getLecturerModules();

  return (
    <main className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-6">Modules</h1>
      <div className="flex flex-wrap gap-4 justify-center">
        {modules && modules.length > 0 ? (
          modules.map((module) => (
            <ModuleCard key={module.code} module={module} />
          ))
        ) : (
          <p>No modules assigned.</p>
        )}
      </div>
    </main>
  );
}
