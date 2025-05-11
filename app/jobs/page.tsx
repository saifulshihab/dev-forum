import JobList from "@/components/job/job-list";
import { getJobs } from "../api";

async function Page() {
  const jobs = await getJobs();
  return <JobList jobs={jobs} />;
}

export default Page;
