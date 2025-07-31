import ProjectList from "@/components/project/project-list";
import { getProjects } from "@/lib/data";

async function Page() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}

export default Page;
