import JobList from "@/components/job/job-list";
import Empty from "@/components/ui/empty";
import prisma from "@/lib/prisma";

async function Page() {
  const jobs = await prisma.job.findMany();
  return (
    <div>
      <div className="flex h-[3.125rem] items-center border-b border-dashed px-4">
        <h1 className="text-2xl font-semibold leading-none">Jobs</h1>
      </div>
      <div className="h-[calc(100vh-3.125rem)] space-y-3 overflow-y-auto p-3">
        {jobs.length ? (
          <JobList jobs={jobs} />
        ) : (
          <Empty text="No jobs circular yet" />
        )}
      </div>
    </div>
  );
}

export default Page;
