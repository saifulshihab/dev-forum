"use client";

import { Job } from "@/generated/prisma";
import { getJob } from "@/lib/actions/job-actions";
import { cn } from "@/lib/utils";
import { FullJob } from "@/types";
import { useState } from "react";
import JobCard from "./job-card";
import JobDetails from "./job-details";

function JobList(props: { jobs: Job[] }) {
  const { jobs } = props;
  const [fullJob, setFullJob] = useState<FullJob | undefined>();
  const [isJobLoading, setJobLoading] = useState(false);

  const onJobClick = async (jobId: string) => {
    try {
      if (jobId === fullJob?.id) return;
      setJobLoading(true);
      const job = await getJob(jobId);
      setFullJob(job as FullJob);
    } catch {
    } finally {
      setJobLoading(false);
    }
  };

  return (
    <div className="flex w-full items-start gap-3">
      <div
        className={cn(
          "grid max-h-[calc(100vh-74px)] grid-cols-2 gap-3 overflow-y-auto",
          fullJob && "w-1/2 grid-cols-1"
        )}
      >
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onClick={(job) => onJobClick(job.id)}
          />
        ))}
      </div>
      {fullJob ? (
        <div className="max-h-[calc(100vh-74px)] w-1/2 overflow-y-auto">
          <JobDetails isLoading={isJobLoading} job={fullJob} />
        </div>
      ) : null}
    </div>
  );
}

export default JobList;
