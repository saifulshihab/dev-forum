"use client";

import Empty from "@/components/ui/empty";
import Spinner from "@/components/ui/spinner";
import { JobApplicationStatus, Prisma } from "@/generated/prisma";
import { getDeveloperUserJobs } from "@/lib/actions/job-actions";
import dayjs from "@/lib/dayjs";
import { cn, toSnakeCase } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function DeveloperUserJobs() {
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [jobApplications, setJobApplications] = useState<
    Prisma.JobApplicationGetPayload<{
      include: {
        job: {
          select: {
            id: true;
            title: true;
            company: true;
          };
        };
      };
    }>[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getDeveloperUserJobs();
        if (res) {
          const { error, jobs } = res;
          if (error) {
            toast.error(error);
            return;
          }
          setJobApplications(jobs || []);
        }
      } catch {
      } finally {
        setIsJobsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-white">My Jobs</h1>
        <p className="mt-1 text-sm text-zinc-400">Jobs you have applied for</p>
      </div>
      <div className="flex w-full items-start gap-3">
        {isJobsLoading ? (
          <Spinner />
        ) : jobApplications.length ? (
          <div className="flex w-full items-start gap-3">
            <div
              className={cn("grid w-full grid-cols-2 gap-3 overflow-y-auto")}
            >
              {jobApplications.map((application) => (
                <div
                  key={application.id}
                  className="space-y-3 rounded-md bg-zinc-900 p-4 px-5"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={`/jobs?jobId=${application.jobId}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <h2 className="line-clamp-1 cursor-pointer font-bold text-white hover:underline">
                          {application.job.title}
                        </h2>
                      </Link>
                      <span
                        className={cn(
                          "rounded px-2 py-0.5 text-xs font-semibold text-white",
                          {
                            "bg-orange-500/10 text-orange-400":
                              application.status ===
                              JobApplicationStatus.PENDING,
                            "bg-green-500/10 text-green-400":
                              application.status ===
                              JobApplicationStatus.VIEWED,
                            "bg-red-500/10 text-red-400":
                              application.status ===
                              JobApplicationStatus.DECLINED
                          }
                        )}
                      >
                        {toSnakeCase(application.status)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">
                      {application.job.company}
                    </p>
                    <p className="text-sm text-zinc-400">
                      Applied on :{" "}
                      {dayjs(application.createdAt).format(
                        "DD/MM/YYYY hh:mm A"
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}

export default DeveloperUserJobs;
