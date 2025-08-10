import ProjectList from "@/components/project/project-list";
import Empty from "@/components/ui/empty";
import { getProjects } from "@/lib/data";

async function Page() {
  const projects = await getProjects();
  return (
    <div>
      <div className="flex h-[3.125rem] items-center border-b border-dashed px-4">
        <h1 className="text-2xl font-semibold leading-none">
          Freelance Projects
        </h1>
      </div>
      <div className="h-[calc(100vh-3.125rem)] space-y-3 overflow-y-auto p-3">
        {projects.length ? (
          <ProjectList projects={projects} />
        ) : (
          <Empty text="No projects yet" />
        )}
      </div>
    </div>
  );
}

export default Page;
