import { Job } from "@/generated/prisma";
import dayjs from "@/lib/dayjs";
import { cn, toSnakeCase } from "@/lib/utils";
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  Users
} from "lucide-react";

type Props = { job: Job; onClick?: (job: Job) => void; onClose?: () => void };

function JobCard(props: Props) {
  const { job, onClick } = props;
  const isJobOpen = dayjs(job.applicationDeadline).isAfter(dayjs());
  return (
    <div className="relative overflow-hidden rounded-lg border bg-zinc-900 shadow-md hover:shadow-lg">
      {/* Status Badge */}
      <span
        className={cn(
          "absolute right-3 top-4 rounded px-2 py-0.5 text-xs font-semibold text-white",
          {
            "bg-green-500/10 text-green-400": isJobOpen,
            "bg-red-500/10 text-red-400": !isJobOpen
          }
        )}
      >
        {isJobOpen ? "Open" : "Closed"}
      </span>
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
            <span>{toSnakeCase(job.employmentType)}</span>
          </div>
          <div className="flex items-center text-zinc-500">
            <DollarSign size={14} className="mr-2" />
            <span>
              {job.salaryCurrency} {job.salaryMin} - {job.salaryMax} /{" "}
              {toSnakeCase(job.salaryPeriod)}
            </span>
          </div>
          <div className="flex items-center text-zinc-500">
            <Users size={14} className="mr-2" />
            <span>{toSnakeCase(job.experienceLevel)}</span>
          </div>
          <div className="flex items-center text-zinc-500">
            <Calendar size={14} className="mr-2" />
            <span>
              Deadline :{" "}
              {job.applicationDeadline
                ? dayjs(job.applicationDeadline).format("DD MMM YYYY")
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
