"use client";

import { Job } from "@/generated/prisma";
import { applyJob, getJob } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { FullJob } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../contexts/auth-provider";
import Empty from "../ui/empty";
import JobCard from "./job-card";
import JobDetails from "./job-details";
import JobFilter from "./job-filter";

function JobList(props: { jobs: Job[] }) {
  const { jobs } = props;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");

  const { requireAuth } = useAuth();
  const [isApplying, setIsApplying] = useState(false);
  const [isJobLoading, setJobLoading] = useState(false);
  const [isJobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [fullJob, setFullJob] = useState<FullJob | undefined>();

  const updateJobIdParam = useCallback(
    (jobId: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (jobId) {
        params.set("jobId", jobId);
      } else {
        params.delete("jobId");
      }
      const queryString = params.toString();
      router.push(queryString ? `${pathname}?${queryString}` : pathname);
    },
    [pathname, router, searchParams]
  );

  const fetchJobDetails = useCallback(async (jobId: string) => {
    try {
      setJobDetailsOpen(true);
      setJobLoading(true);
      const job = await getJob(jobId);
      setFullJob(job as FullJob);
    } catch {
    } finally {
      setJobLoading(false);
    }
  }, []);

  useEffect(() => {
    if (jobId) {
      fetchJobDetails(jobId);
    } else {
      setJobDetailsOpen(false);
      setFullJob(undefined);
    }
  }, [jobId, fetchJobDetails]);

  const onJobClick = (jobId: string) => {
    if (jobId === fullJob?.id) return;
    updateJobIdParam(jobId);
  };

  const onCloseJobDetails = () => {
    updateJobIdParam(null);
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
    <div className="flex w-full flex-col gap-3">
      <JobFilter />
      {jobs.length > 0 ? (
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
                onClose={onCloseJobDetails}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <Empty text="No jobs found" />
      )}
    </div>
  );
}

export default JobList;
