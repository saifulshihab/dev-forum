"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Empty from "@/components/ui/empty";
import { Skeleton } from "@/components/ui/skeleton";
import { Prisma } from "@/generated/prisma";
import {
  deleteJob,
  getJobApplications,
  getRecruiterUserJobs
} from "@/lib/actions";
import dayjs from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  Building2,
  Calendar,
  ExternalLink,
  EyeIcon,
  Trash
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import JobApplicants from "./job-applicants";

function RecruiterUserJobs() {
  const [isJobsLoading, setIsJobsLoading] = useState(true);
  const [isJobDeleting, setIsJobDeleting] = useState<string | undefined>();

  const [isJobDetailsOpen, setJobDetailsOpen] = useState(false);
  const [isJobApplicationsLoading, setIsJobApplicationsLoading] =
    useState(false);
  const [jobs, setJobs] = useState<
    Prisma.JobGetPayload<{
      select: {
        id: true;
        title: true;
        company: true;
        applicationDeadline: true;
      };
    }>[]
  >([]);
  const [selectedJob, setSelectedJob] = useState<Prisma.JobGetPayload<{
    select: {
      id: true;
      title: true;
      company: true;
      applicationDeadline: true;
    };
  }> | null>(null);
  const [jobApplications, setJobApplications] = useState<
    Prisma.JobApplicationGetPayload<{
      include: {
        user: {
          select: { id: true; fullName: true; dpUrl: true; email: true };
        };
      };
    }>[]
  >([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getRecruiterUserJobs();
        if (res) {
          const { error, jobs } = res;
          if (error) {
            toast.error(error);
            return;
          }
          setJobs(jobs || []);
        }
      } catch {
      } finally {
        setIsJobsLoading(false);
      }
    })();
  }, []);

  const onViewApplicants = async (jobId: string) => {
    try {
      setIsJobApplicationsLoading(true);
      const job = jobs.find((job) => job.id === jobId) || null;
      setSelectedJob(job);
      setJobDetailsOpen(true);
      const res = await getJobApplications(jobId);
      if (res.error) {
        toast.error(res.error);
        return;
      }
      setJobApplications(res.applications || []);
    } catch {
    } finally {
      setIsJobApplicationsLoading(false);
    }
  };

  const handleDelete = async (jobId: string) => {
    try {
      setIsJobDeleting(jobId);
      await deleteJob(jobId);
      toast.success("Job posting deleted successfully");
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      // Close applicants panel if the deleted job was selected
      if (selectedJob?.id === jobId) {
        setSelectedJob(null);
        setJobDetailsOpen(false);
      }
    } catch {
      toast.error("Failed to delete job posting");
    } finally {
      setIsJobDeleting(undefined);
    }
  };

  const isJobOpen = (deadline: Date) => {
    return dayjs(deadline).isAfter(dayjs());
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
            <h1 className="text-2xl font-bold text-white">My Job Postings</h1>
            <p className="mt-0.5 text-sm text-zinc-400">
              Manage your job postings and review applicants
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex w-full items-start gap-4">
        {isJobsLoading ? (
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            {Array(4)
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
                      <Skeleton className="h-6 w-20 rounded-md bg-zinc-800" />
                    </div>
                  </div>
                  <div className="p-4">
                    <Skeleton className="mb-3 h-4 w-32 bg-zinc-800" />
                    <div className="flex items-center justify-between gap-2 border-t border-zinc-800 pt-3">
                      <Skeleton className="h-8 w-32 rounded-md bg-zinc-800" />
                      <Skeleton className="h-8 w-24 rounded-md bg-zinc-800" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : jobs.length ? (
          <div className="flex w-full items-start gap-4">
            <div
              className={cn(
                "grid w-full grid-cols-1 gap-4 overflow-y-auto sm:grid-cols-2",
                isJobDetailsOpen && "w-1/2 sm:grid-cols-1"
              )}
            >
              {jobs.map((job) => {
                const jobIsOpen = isJobOpen(job.applicationDeadline);
                return (
                  <div
                    key={job.id}
                    className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:border-zinc-700 hover:shadow-xl"
                  >
                    {/* Header Section */}
                    <div className="rounded-t-xl border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
                      <div className="mb-3 flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h2 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-primary">
                            {job.title}
                          </h2>
                          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                            <Building2
                              size={14}
                              className="shrink-0 text-zinc-500"
                            />
                            <span className="truncate">{job.company}</span>
                          </div>
                        </div>
                        <Badge
                          variant={jobIsOpen ? "default" : "destructive"}
                          className={
                            jobIsOpen
                              ? "shrink-0 border-green-500/20 bg-green-500/10 text-green-400"
                              : "shrink-0 border-red-500/20 bg-red-500/10 text-red-400"
                          }
                        >
                          {jobIsOpen ? "Active" : "Closed"}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4">
                      <div className="mb-4 flex items-center gap-2 text-xs text-zinc-500">
                        <Calendar
                          size={14}
                          className="shrink-0 text-zinc-400"
                        />
                        <span>
                          Application deadline:{" "}
                          <span className="font-medium text-zinc-400">
                            {dayjs(job.applicationDeadline).format(
                              "MMMM DD, YYYY"
                            )}
                          </span>
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between gap-2 border-t border-zinc-800 pt-3">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => onViewApplicants(job.id)}
                          className="flex-1"
                        >
                          <EyeIcon size={14} />
                          View Applicants
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="destructive"
                              isLoading={isJobDeleting === job.id}
                              className="min-w-[100px]"
                            >
                              <Trash size={14} />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Delete Job Posting?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This will permanently delete your job posting
                                and all associated applications. This action
                                cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(job.id)}
                              >
                                Yes, Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>

                      {/* View Job Link */}
                      <div className="mt-3 flex items-center justify-end border-t border-zinc-800 pt-3">
                        <Link
                          target="_blank"
                          rel="noreferrer"
                          href={`/jobs?jobId=${job.id}`}
                          className="flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                        >
                          <span>View Job Details</span>
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Applicants Panel */}
            {isJobDetailsOpen && selectedJob ? (
              <div className="w-1/2">
                <div className="sticky top-0 max-h-[calc(100vh-4.625rem)] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900">
                  <JobApplicants
                    isLoading={isJobApplicationsLoading}
                    job={
                      {
                        id: selectedJob.id,
                        title: selectedJob.title,
                        company: selectedJob.company,
                        applicationDeadline: selectedJob.applicationDeadline
                      } as any
                    }
                    jobApplications={jobApplications}
                    onClose={() => {
                      setSelectedJob(null);
                      setJobDetailsOpen(false);
                    }}
                  />
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <Empty text="No job postings yet" />
        )}
      </div>
    </div>
  );
}

export default RecruiterUserJobs;
