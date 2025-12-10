"use client";

import { Badge } from "@/components/ui/badge";
import Empty from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { JobApplicationStatus, Prisma } from "@/generated/prisma";
import { getDeveloperUserJobs } from "@/lib/actions";
import dayjs from "@/lib/dayjs";
import { Briefcase, Building2, Calendar, ExternalLink } from "lucide-react";
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
        toast.error("Failed to load job applications");
      } finally {
        setIsJobsLoading(false);
      }
    })();
  }, []);

  const getStatusBadge = (status: JobApplicationStatus) => {
    const statusConfig = {
      [JobApplicationStatus.PENDING]: {
        label: "Pending Review",
        className: "border-orange-500/20 bg-orange-500/10 text-orange-400"
      },
      [JobApplicationStatus.VIEWED]: {
        label: "Under Review",
        className: "border-green-500/20 bg-green-500/10 text-green-400"
      },
      [JobApplicationStatus.DECLINED]: {
        label: "Not Selected",
        className: "border-red-500/20 bg-red-500/10 text-red-400"
      }
    };

    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Briefcase size={20} className="text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Job Applications</h1>
            <p className="mt-0.5 text-sm text-zinc-400">
              Track the status of your job applications
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {isJobsLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {Array(6)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-md"
              >
                <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <Skeleton className="mb-2 h-6 w-3/4 bg-zinc-800" />
                      <Skeleton className="h-4 w-1/2 bg-zinc-800" />
                    </div>
                    <Skeleton className="h-6 w-24 rounded-md bg-zinc-800" />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 border-t border-zinc-800 pt-3">
                    <Skeleton className="h-3 w-32 bg-zinc-800" />
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : jobApplications.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {jobApplications.map((application) => (
            <div
              key={application.id}
              className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:border-zinc-700 hover:shadow-xl"
            >
              {/* Header Section */}
              <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h2 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-primary">
                      {application.job.title}
                    </h2>
                    <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                      <Building2 size={14} className="shrink-0 text-zinc-500" />
                      <span className="truncate">
                        {application.job.company}
                      </span>
                    </div>
                  </div>
                  {getStatusBadge(application.status)}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-zinc-500">
                  <Calendar size={14} className="shrink-0 text-zinc-400" />
                  <span>
                    Applied on{" "}
                    <span className="font-medium text-zinc-400">
                      {dayjs(application.createdAt).format("MMMM DD, YYYY")}
                    </span>
                  </span>
                </div>
                <div className="mt-3 flex items-center justify-end border-t border-zinc-800 pt-3">
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    href={`/jobs?jobId=${application.jobId}`}
                    className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                  >
                    <span>View Job Details</span>
                    <ExternalLink size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty text="No job applications yet" />
      )}
    </div>
  );
}

export default DeveloperUserJobs;
