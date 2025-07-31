import { nextAuthOptions } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/lib/actions";
import dayjs from "dayjs";
import {
  BriefcaseBusiness,
  Calendar1,
  Globe,
  GraduationCap,
  Home,
  Layers,
  Mail,
  Wrench
} from "lucide-react";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { notFound } from "next/navigation";

async function Page() {
  const user = await getCurrentUser(true);
  if (!user) notFound();
  const sessionUser = await getServerSession(nextAuthOptions);
  return (
    <div>
      <div className="cover relative h-60 w-full">
        <div className="absolute left-[2.5rem] top-1/2 h-40 w-40 rounded-sm">
          {sessionUser?.user?.image || user.dpUrl ? (
            <Image
              fill
              priority
              alt={user.fullName}
              src={
                (sessionUser?.user?.image as string) || (user.dpUrl as string)
              }
              sizes="(max-width: 160px) 100vw"
            />
          ) : null}
        </div>
      </div>
      <div className="w-full p-10">
        <div className="mt-5">
          <h2 className="text-2xl font-extrabold">{user.fullName}</h2>
        </div>
        <div className="flex flex-col gap-1 text-sm">
          {user.username ? <p className="text-xs">@{user.username}</p> : null}
          {user.bio ? <p>{user.bio}</p> : null}
          {user.email ? (
            <div className="inline-flex items-center gap-2">
              <Mail size={14} />
              <p>{user.email}</p>
            </div>
          ) : null}
          {user.websiteUrl ? (
            <div className="inline-flex items-center gap-2">
              <Globe size={14} />
              <a
                rel="noreferrer"
                target="_blank"
                className="hover:text-sky-400 hover:underline"
                href={user.websiteUrl}
              >
                {user.websiteUrl}
              </a>
            </div>
          ) : null}
          {user.location ? (
            <div className="inline-flex items-center gap-2">
              <Home size={14} />
              <p>From {user.location}</p>
            </div>
          ) : null}
          {user.createdAt ? (
            <div className="inline-flex items-center gap-2">
              <Calendar1 size={14} />
              <p>Joined {dayjs(user.createdAt).format("DD MMM YYYY")}</p>
            </div>
          ) : null}
        </div>
        {/* {user.socialLinks.length ? (
          <div className="flex flex-wrap items-center gap-3">
            {user.socialLinks.map((link) =>
              link.platform === "Facebook" ? (
                <div key={link.id}>
                  
                </div>
              ) : null
            )}
          </div>
        ) : null} */}
        {user.skills.length ? (
          <div className="mt-5">
            <div className="inline-flex items-center gap-3">
              <Wrench />
              <h2 className="text-lg font-semibold">Skills</h2>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              {user.skills.map((skill) => (
                <Badge className="bg-zinc-800" variant="outline" key={skill.id}>
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}
        {user.experiences.length ? (
          <div className="mt-5">
            <div className="inline-flex items-center gap-3">
              <BriefcaseBusiness />
              <h2 className="text-lg font-semibold">Experience</h2>
            </div>
            <div className="mt-2 flex flex-col gap-3">
              {user.experiences.map((experience) => (
                <div key={experience.id} className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">
                    {experience.company}
                  </h3>
                  <p className="text-xs italic text-zinc-400">
                    {dayjs(experience.from).format("MMM YYYY")} -{" "}
                    {experience.present
                      ? "Present"
                      : dayjs(experience.to).format("MMM YYYY")}
                  </p>
                  {experience.description ? (
                    <p className="text-sm text-zinc-400">
                      {experience.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {user.projects.length ? (
          <div className="mt-5">
            <div className="inline-flex items-center gap-3">
              <Layers />
              <h2 className="text-lg font-semibold">Project</h2>
            </div>
            <div className="mt-2 flex flex-col gap-3">
              {user.projects.map((project) => (
                <div key={project.id} className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">{project.name}</h3>
                  {project.description ? (
                    <p className="text-sm text-zinc-400">
                      {project.description}
                    </p>
                  ) : null}
                  {project.url ? (
                    <div className="inline-flex items-center gap-1 text-sm text-zinc-400">
                      <p>URL :</p>
                      <a
                        className="hover:text-sky-400 hover:underline"
                        href={project.url}
                        target="_blank"
                      >
                        {project.url}
                      </a>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
        {user.educations.length ? (
          <div className="mt-5">
            <div className="inline-flex items-center gap-3">
              <GraduationCap />
              <h2 className="text-lg font-semibold">Education</h2>
            </div>
            <div className="mt-2 flex flex-col gap-3">
              {user.educations.map((education) => (
                <div key={education.id} className="flex flex-col gap-1">
                  <h3 className="text-sm font-semibold">
                    {education.institute}
                  </h3>
                  <p className="text-xs italic text-zinc-400">
                    {dayjs(education.from).format("MMM YYYY")} -{" "}
                    {education.present
                      ? "Present"
                      : dayjs(education.to).format("MMM YYYY")}
                  </p>
                  {education.description ? (
                    <p className="text-sm text-zinc-400">
                      {education.description}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Page;
