import { Badge } from "@/components/ui/badge";
import { Job } from "@/generated/prisma";
import dayjs from "@/lib/dayjs";
import { toSnakeCase } from "@/lib/utils";
import {
  Briefcase,
  Building2,
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
    <div
      onClick={() => onClick && onClick(job)}
      className="group relative cursor-pointer overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-md transition-all hover:border-zinc-700 hover:shadow-xl"
    >
      {/* Header Section */}
      <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800/50 p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h2 className="mb-1.5 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-primary">
              {job.title}
            </h2>
            <div className="flex items-center gap-1.5 text-sm text-zinc-400">
              <Building2 size={14} className="shrink-0 text-zinc-500" />
              <span className="truncate">{job.company}</span>
            </div>
          </div>
          <Badge
            className={
              isJobOpen
                ? "shrink-0 border-green-500/20 bg-green-500/10 text-green-400 hover:bg-green-400/10"
                : "shrink-0 border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-400/10"
            }
          >
            {isJobOpen ? "Open" : "Closed"}
          </Badge>
        </div>
      </div>
      {/* Content Section */}
      <div className="p-4">
        {/* Key Info Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex items-center gap-2 overflow-hidden rounded-md bg-zinc-800/30 px-2.5 py-2">
            <MapPin size={14} className="shrink-0 text-zinc-400" />
            <span className="truncate text-xs text-zinc-300">
              {job.location}
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md bg-zinc-800/30 px-2.5 py-2">
            <Briefcase size={14} className="shrink-0 text-zinc-400" />
            <span className="truncate text-xs text-zinc-300">
              {toSnakeCase(job.employmentType)}
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md bg-zinc-800/30 px-2.5 py-2">
            <DollarSign size={14} className="shrink-0 text-zinc-400" />
            <span className="truncate text-xs text-zinc-300">
              {job.salaryCurrency} {job.salaryMin.toLocaleString()} -{" "}
              {job.salaryMax.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2 overflow-hidden rounded-md bg-zinc-800/30 px-2.5 py-2">
            <Users size={14} className="shrink-0 text-zinc-400" />
            <span className="truncate text-xs text-zinc-300">
              {toSnakeCase(job.experienceLevel)}
            </span>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-zinc-800 pt-3">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Calendar size={12} />
            <span>
              Application Deadline :{" "}
              {job.applicationDeadline
                ? dayjs(job.applicationDeadline).format("MMM DD YYYY")
                : "N/A"}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Clock size={12} />
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
