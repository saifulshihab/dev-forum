import { Job } from "@/generated/prisma";
import dayjs from "@/lib/dayjs";
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users
} from "lucide-react";

function JobCard(props: { job: Job; onClick?: (job: Job) => void }) {
  const { job, onClick } = props;
  return (
    <div className="overflow-hidden rounded-lg border bg-zinc-900 shadow-md transition hover:shadow-lg">
      <div className="p-4">
        <div className="flex flex-col gap-1">
          <h2
            onClick={() => onClick && onClick(job)}
            className="cursor-pointer text-lg font-bold text-white hover:underline"
          >
            {job.title}
          </h2>
          <p className="text-sm font-medium text-zinc-400">{job.company}</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-zinc-500">
            <MapPin size={14} className="mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-zinc-500">
            <Briefcase size={14} className="mr-2" />
            <span>{job.employmentType}</span>
          </div>
          <div className="flex items-center text-zinc-500">
            <DollarSign size={14} className="mr-2" />
            <span>
              {job.salaryCurrency} {job.salaryMin} - {job.salaryMax} /{" "}
              {job.salaryPeriod}
            </span>
          </div>
          <div className="flex items-center text-zinc-500">
            <Users size={14} className="mr-2" />
            <span>{job.experienceLevel}</span>
          </div>
          <div className="flex items-center text-zinc-500">
            <Calendar size={14} className="mr-2" />
            <span>
              Deadline:{" "}
              {job.applicationDeadline
                ? new Date(job.applicationDeadline).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center text-zinc-500">
            <Clock size={14} className="mr-2" />
            <span>
              Posted{" "}
              {job.createdAt ? dayjs(job.createdAt).fromNow(false) : "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
