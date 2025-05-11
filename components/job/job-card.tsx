import { IJobCircular } from "@/types/job";
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  EyeIcon,
  MapPin,
  Users
} from "lucide-react";
import { Button } from "../ui/button";
import { formatSalary, getDaysAgo } from "./job-list";

function JobCard(props: {
  job: IJobCircular;
  onClick?: (job: IJobCircular) => void;
}) {
  const { job, onClick } = props;
  return (
    <div className="overflow-hidden rounded-md border bg-zinc-900">
      {/* Header */}
      <div className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div>
              <h2 className="font-bold text-white">{job.title}</h2>
              <p className="text-sm text-zinc-400">{job.company}</p>
            </div>
          </div>
          <Button variant="secondary" onClick={() => onClick && onClick(job)}>
            <EyeIcon size={16} />
          </Button>
        </div>

        {/* Job Meta Information */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-zinc-500">
            <MapPin size={14} className="mr-2 text-zinc-500" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-zinc-500">
            <Briefcase size={14} className="mr-2 text-zinc-500" />
            <span>{job.employment_type}</span>
          </div>
          <div className="flex items-center text-zinc-500">
            <DollarSign size={14} className="mr-2 text-zinc-500" />
            <span>{formatSalary(job.salary)}</span>
          </div>
          <div className="flex items-center text-zinc-500">
            <Users size={14} className="mr-2 text-zinc-500" />
            <span>{job.experience_level}</span>
          </div>
          <div className="flex items-center text-zinc-500">
            <Calendar size={14} className="mr-2 text-zinc-500" />
            <span>Posted {getDaysAgo(job.posted_date)}</span>
          </div>
          <div className="flex items-center text-zinc-500">
            <Clock size={14} className="mr-2 text-zinc-500" />
            <span>
              Apply by {new Date(job.application_deadline).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded bg-zinc-800 px-1 py-[1px] text-xs font-semibold"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
