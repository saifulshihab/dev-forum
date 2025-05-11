import { IProject } from "@/types/project";
import { Clock, DollarSign } from "lucide-react";
import { formatBudget, formatRelativeDate } from "./project-list";

function ProjectCard(props: {
  project: IProject;
  onClick?: (project: IProject) => void;
}) {
  const { project, onClick } = props;
  return (
    <div>
      <div className="w-full overflow-hidden rounded-md border bg-zinc-900 shadow-md transition-shadow duration-300 hover:shadow-lg">
        {/* Card Header */}
        <div className="border-b p-3 pb-2">
          <h2
            className="mb-1 cursor-pointer font-semibold"
            onClick={() => onClick && onClick(project)}
          >
            {project.title}
          </h2>
          <p className="text-sm text-zinc-500">
            Posted {formatRelativeDate(project.created_at)}
          </p>
        </div>

        {/* Card Body */}
        <div className="p-3 pt-2">
          <p className="mb-2 line-clamp-2 text-sm text-zinc-400">
            {project.description}
          </p>

          {/* Skills */}
          <div className="mb-2">
            <div className="flex flex-wrap gap-2">
              {project.skills_required.slice(0, 5).map((skill, index) => (
                <span
                  key={index}
                  className="rounded bg-zinc-800 px-1 py-[1px] text-xs font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Project Info */}
          <div className="grid grid-cols-2 gap-1 text-sm">
            {/* Budget */}
            <div className="flex items-center">
              <DollarSign size={14} className="mr-2 text-zinc-500" />
              <span className="font-medium text-zinc-500">
                {formatBudget(project)}
              </span>
            </div>

            {/* Duration if available */}
            {project.estimated_duration && (
              <div className="flex items-center">
                <Clock size={14} className="mr-2 text-zinc-500" />
                <span className="text-zinc-500">
                  {project.estimated_duration}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
