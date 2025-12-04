"use client";

import { Job } from "@/generated/prisma";
import { applyJob, getJob } from "@/lib/actions/job-actions";
import { cn } from "@/lib/utils";
import { FullJob } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/auth-provider";
import JobCard from "./job-card";
import JobDetails from "./job-details";

function JobList(props: { jobs: Job[] }) {
  const { jobs } = props;
  const { requireAuth } = useAuth();
  const [isJobLoading, setJobLoading] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isJobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [fullJob, setFullJob] = useState<FullJob | undefined>();

  const onJobClick = async (jobId: string) => {
    try {
      if (jobId === fullJob?.id) return;
      setJobDetailsOpen(true);
      setJobLoading(true);
      const job = await getJob(jobId);
      setFullJob(job as FullJob);
    } catch {
    } finally {
      setJobLoading(false);
    }
  };

  const onApplyJob = async (
    jobId: string,
    coverLetter?: string,
    cb?: () => void
  ) => {
    try {
      if (requireAuth()) return;
      setIsApplying(true);
      const res = await applyJob(jobId, coverLetter);
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      if (cb) cb();
      toast.success("Successfully applied to the job!");
    } catch {
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="flex w-full items-start gap-3">
      <div
        className={cn(
          "grid max-h-[calc(100vh-4.625rem)] w-full grid-cols-2 gap-3 overflow-y-auto",
          isJobDetailsOpen && "w-1/2 grid-cols-1"
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
      {isJobDetailsOpen ? (
        <div className="max-h-[calc(100vh-4.625rem)] w-1/2 overflow-y-auto">
          <JobDetails
            job={fullJob}
            onApply={onApplyJob}
            isLoading={isJobLoading}
            isApplying={isApplying}
            onClose={() => {
              setJobDetailsOpen(false);
              setFullJob(undefined);
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

export default JobList;
