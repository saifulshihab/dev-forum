import ProjectList from "@/components/project/project-list";
import { getProjects } from "../api";

async function Page() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}

export default Page;
