import ProjectList from "@/components/project/project-list";
import { getProjects } from "../api";

async function Page() {
  const projects = await getProjects();
  return (
    <div className="flex flex-col gap-5">
      <ProjectList projects={projects} />
    </div>
  );
}

export default Page;
