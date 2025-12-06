import JobList from "@/components/job/job-list";
import { getJobs } from "@/lib/actions/job-actions";
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

  return (
    <div>
      <div className="flex h-[3.125rem] items-center border-b border-dashed px-4">
        <h1 className="text-2xl font-semibold leading-none">Jobs</h1>
      </div>
      <div className="h-[calc(100vh-3.125rem)] space-y-3 overflow-y-auto p-3">
        <JobList jobs={jobs} />
      </div>
    </div>
  );
}

export default Page;
