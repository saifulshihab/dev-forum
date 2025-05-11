"use client";

import { BudgetType, IProject } from "@/types/project";
import { Fragment, useState } from "react";
import { Button } from "../ui/button";
import Empty from "../ui/empty";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle
} from "../ui/sheet";
import ProjectCard from "./project-card";

export const formatBudget = (project: IProject) => {
  if (project.budget_type === BudgetType.NEGOTIABLE) {
    return project.budget ? `${project.budget} (Negotiable)` : "Negotiable";
  }

  if (project.budget_type === BudgetType.HOURLY) {
    if (project.budget) return `Up to $${project.budget}/hr`;
    return "Hourly Rate";
  }

  return project.budget ? `${project.budget} (Fixed price)` : "Fixed price";
};

export const formatRelativeDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) {
    return "Today";
  } else if (diffInDays === 1) {
    return "Yesterday";
  } else if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  } else {
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }
};

function ProjectList(props: { projects: IProject[] }) {
  const { projects } = props;
  const [project, setProject] = useState<IProject | undefined>();
  return (
    <div>
      {projects.length ? (
        <div className="flex flex-col gap-5">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={(project) => setProject(project)}
            />
          ))}
        </div>
      ) : (
        <Empty />
      )}
      <Sheet open={!!project} onOpenChange={() => setProject(undefined)}>
        <SheetContent className="overflow-x-auto">
          {project ? (
            <Fragment>
              <SheetHeader>
                <SheetTitle>{project.title}</SheetTitle>
                <p className="text-sm text-zinc-500">
                  Posted {formatRelativeDate(project.created_at)}
                </p>
                <SheetDescription>{project.description}</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-5 px-4">
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-semibold">Skills Required</p>
                  <div className="flex flex-wrap gap-2">
                    {project.skills_required.map((skill, index) => (
                      <span
                        key={index}
                        className="rounded bg-zinc-800 px-1 py-[1px] text-xs font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-semibold">Budget</p>
                  <p className="text-sm text-zinc-500">
                    {formatBudget(project)}
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-sm font-semibold">Duration</p>
                  {project.estimated_duration ? (
                    <p className="text-sm text-zinc-500">
                      {project.estimated_duration}
                    </p>
                  ) : (
                    <p className="text-sm text-zinc-500">N/A</p>
                  )}
                </div>
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Send proposal</Button>
                </SheetClose>
              </SheetFooter>
            </Fragment>
          ) : (
            <Empty />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default ProjectList;
