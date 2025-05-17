import { getJobs } from "@/app/data";
import JobList from "@/components/job/job-list";

async function Page() {
  const jobs = await getJobs();
  return <JobList jobs={jobs} />;
}

export default Page;
