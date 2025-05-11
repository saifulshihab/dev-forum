"use client";

import { IJobCircular } from "@/types/job";
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users
} from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "../ui/dialog";
import Empty from "../ui/empty";
import JobCard from "./job-card";

// Format salary range
export const formatSalary = (salary: any) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: salary.currency,
    maximumFractionDigits: 0
  });

  const min = formatter.format(salary.min);
  const max = formatter.format(salary.max);
  const period =
    salary.period === "yearly"
      ? "/year"
      : salary.period === "monthly"
        ? "/month"
        : "/hour";

  return `${min} - ${max}${period}`;
};

// Calculate days ago
export const getDaysAgo = (dateString: string) => {
  const posted_date = new Date(dateString);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - posted_date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

function JobList(props: { jobs: IJobCircular[] }) {
  const { jobs } = props;
  const [job, setJob] = useState<IJobCircular | undefined>();
  return (
    <div>
      {jobs.length ? (
        <div className="grid grid-cols-2 gap-5">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} onClick={(job) => setJob(job)} />
          ))}
        </div>
      ) : (
        <Empty />
      )}
      <Dialog open={!!job} onOpenChange={() => setJob(undefined)}>
        <DialogContent className="max-w-6xl overflow-x-auto">
          {job ? (
            <>
              <DialogHeader>
                <div className="flex items-center">
                  <div>
                    <DialogTitle className="text-md">{job.title}</DialogTitle>
                    <p className="text-sm text-zinc-400">{job.company}</p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center text-zinc-500">
                    <MapPin size={16} className="mr-2 text-zinc-500" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-zinc-500">
                    <Briefcase size={16} className="mr-2 text-zinc-500" />
                    <span>{job.employment_type}</span>
                  </div>
                  <div className="flex items-center text-zinc-500">
                    <DollarSign size={16} className="mr-2 text-zinc-500" />
                    <span>{formatSalary(job.salary)}</span>
                  </div>
                  <div className="flex items-center text-zinc-500">
                    <Users size={16} className="mr-2 text-zinc-500" />
                    <span>{job.experience_level}</span>
                  </div>
                  <div className="flex items-center text-zinc-500">
                    <Calendar size={16} className="mr-2 text-zinc-500" />
                    <span>Posted {getDaysAgo(job.posted_date)}</span>
                  </div>
                  <div className="flex items-center text-zinc-500">
                    <Clock size={16} className="mr-2 text-zinc-500" />
                    <span>
                      Apply by{" "}
                      {new Date(job.application_deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </DialogHeader>
              <div className="flex flex-col gap-4">
                {/* Job description */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    About the job
                  </h3>
                  <p className="text-sm text-zinc-400">{job.description} </p>
                </div>
                {/* Responsibilities */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    Responsibilities
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-zinc-400">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                {/* Requirements */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    Requirements
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-zinc-400">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                {/* Benefits */}
                <div>
                  <h3 className="mb-2 text-sm font-semibold text-white">
                    Benefits
                  </h3>
                  <ul className="list-inside list-disc space-y-1 text-sm text-zinc-400">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Apply for this job</Button>
              </DialogFooter>
            </>
          ) : (
            <Empty />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default JobList;
