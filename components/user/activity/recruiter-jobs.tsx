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
import { Button } from "@/components/ui/button";
import Empty from "@/components/ui/empty";
import Spinner from "@/components/ui/spinner";
import { Prisma } from "@/generated/prisma";
import {
  deleteJob,
  getJobApplications,
  getRecruiterUserJobs
} from "@/lib/actions/job-actions";
import dayjs from "@/lib/dayjs";
import { cn } from "@/lib/utils";
import { EyeIcon, Trash } from "lucide-react";
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
      const job = jobs.find((j) => j.id === jobId) || null;
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
      toast.success("Jobs circular deleted");
      setJobs((prev) => prev.filter((question) => question.id !== jobId));
    } catch {
    } finally {
      setIsJobDeleting(undefined);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-xl font-bold text-white">My Jobs</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Manage jobs you have posted and view applicants
        </p>
      </div>
      <div className="flex w-full items-start gap-3">
        {isJobsLoading ? (
          <Spinner />
        ) : jobs.length ? (
          <div className="flex w-full items-start gap-3">
            <div
              className={cn(
                "grid max-h-[calc(100vh-4.625rem)] w-full grid-cols-2 gap-3 overflow-y-auto",
                { "w-1/2 grid-cols-1": isJobDetailsOpen }
              )}
            >
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="space-y-3 rounded-md bg-zinc-900 p-4 px-5"
                >
                  <div className="space-y-1">
                    <h2 className="cursor-pointer font-bold text-white">
                      {job.title}
                    </h2>
                    <p className="text-sm text-zinc-400">{job.company}</p>
                    <p className="text-sm text-zinc-400">
                      Deadline :{" "}
                      {dayjs(job.applicationDeadline).format("DD/MM/YYYY")}
                    </p>
                  </div>
                  <div className="flex justify-between gap-3">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onViewApplicants(job.id)}
                    >
                      <EyeIcon className="mr-1 h-4 w-4" />
                      View Applicants
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          isLoading={isJobDeleting === job.id}
                        >
                          <Trash />
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete your job circular.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(job.id)}
                          >
                            Yes, Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
            {isJobDetailsOpen && selectedJob ? (
              <div className="max-h-[calc(100vh-4.625rem)] w-1/2 overflow-y-auto">
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
                />
              </div>
            ) : null}
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </div>
  );
}

export default RecruiterUserJobs;
