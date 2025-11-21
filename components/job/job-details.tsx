import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import dayjs from "@/lib/dayjs";
import { FullJob } from "@/types";

type Props = {
  isLoading: boolean;
  job: FullJob;
};

function JobDetails({ isLoading, job }: Props) {
  if (isLoading) {
    return (
      <div className="w-full max-w-2xl rounded-lg bg-zinc-900 p-8 shadow-lg">
        <div className="mb-6 border-b pb-4">
          <Skeleton className="mb-2 h-8 w-2/3" />
          <Skeleton className="h-6 w-1/3" />
          <div className="mt-2 flex flex-wrap gap-4">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-28" />
          </div>
        </div>

        <div className="mb-6">
          <Skeleton className="mb-2 h-6 w-1/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="mt-2 h-5 w-5/6" />
        </div>

        <div className="mb-6">
          <Skeleton className="mb-2 h-6 w-1/4" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="mt-2 h-5 w-1/2" />
        </div>

        <div className="mb-6">
          <Skeleton className="mb-2 h-6 w-1/4" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="mt-2 h-5 w-1/2" />
        </div>

        <div className="mb-6">
          <Skeleton className="mb-2 h-6 w-1/4" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>

        <div className="mt-8 text-center">
          <Skeleton className="mx-auto h-10 w-32" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl rounded-lg bg-zinc-900 p-8 shadow-lg">
      <div className="mb-6 border-b pb-4">
        <h1 className="mb-2 text-2xl font-bold text-white">{job.title}</h1>
        <p className="text-lg text-zinc-400">{job.company}</p>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-500">
          <span>Location: {job.location}</span>
          <span>Type: {job.employmentType}</span>
          <span>
            Salary: {job.salaryCurrency} {job.salaryMin} - {job.salaryMax} /{" "}
            {job.salaryPeriod}
          </span>
          <span>Experience: {job.experienceLevel}</span>
          <span>
            Deadline:{" "}
            {job.applicationDeadline
              ? dayjs(job.applicationDeadline).format("MMM D, YYYY")
              : "N/A"}
          </span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-lg font-semibold text-white">Description</h2>
        <p className="whitespace-pre-line text-sm text-zinc-300">
          {job.description}
        </p>
      </div>

      {job.responsibilities?.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-white">
            Responsibilities
          </h2>
          <ul className="ml-6 list-disc text-sm text-zinc-300">
            {job.responsibilities.map((r) => (
              <li key={r.id}>{r.detail}</li>
            ))}
          </ul>
        </div>
      )}

      {job.requirements?.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-white">
            Requirements
          </h2>
          <ul className="ml-6 list-disc text-sm text-zinc-300">
            {job.requirements.map((r) => (
              <li key={r.id}>{r.detail}</li>
            ))}
          </ul>
        </div>
      )}

      {job.benefits?.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-white">Benefits</h2>
          <ul className="ml-6 list-disc text-sm text-zinc-300">
            {job.benefits.map((b) => (
              <li key={b.id}>{b.detail}</li>
            ))}
          </ul>
        </div>
      )}

      {job.tags?.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-2 text-lg font-semibold text-white">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="mt-8 flex justify-end">
        <Button size="lg" variant="default">
          Apply
        </Button>
      </div>
    </div>
  );
}

export default JobDetails;
