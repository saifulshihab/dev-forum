import JobList from "@/components/job/job-list";
import { getJobs } from "@/lib/actions";
import { JobsPageSearchParams } from "@/types";

async function Page({ searchParams }: { searchParams: JobsPageSearchParams }) {
  const {
    tag,
    search,
    company,
    location,
    salaryMin,
    salaryMax,
    salaryPeriod,
    employmentType,
    experienceLevel,
    salaryCurrency
  } = searchParams;

  const filters = {
    tag,
    search,
    company,
    location,
    employmentType,
    salaryPeriod,
    salaryCurrency,
    experienceLevel,
    salaryMin: salaryMin ? parseInt(salaryMin) : undefined,
    salaryMax: salaryMax ? parseInt(salaryMax) : undefined
  };

  const result = await getJobs(filters);
  const jobs = result?.jobs || [];

  return <JobList jobs={jobs} />;
}

export default Page;
