import { getProjects } from "@/app/data";
import ProjectList from "@/components/project/project-list";

async function Page() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}

export default Page;
