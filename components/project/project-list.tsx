"use client";

import { IProject } from "@/types/project";
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
import ProjectCard, { formatBudget, formatRelativeDate } from "./project-card";

function ProjectList(props: { projects: IProject[] }) {
  const { projects } = props;
  const [project, setProject] = useState<IProject | undefined>();
  return (
    <Fragment>
      {projects.length ? (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={(project) => setProject(project)}
          />
        ))
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
    </Fragment>
  );
}

export default ProjectList;
