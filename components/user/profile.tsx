import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FullUser } from "@/types";
import dayjs from "dayjs";
import {
  BriefcaseBusiness,
  Building2,
  Calendar1,
  ExternalLink,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  User,
  UserPen,
  Wrench
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  user: FullUser;
  currentUser?: boolean;
};

function UserProfile(props: Props) {
  const { user, currentUser } = props;
  return (
    <div className="min-h-screen">
      <div className="border-b border-dashed border-teal-900 bg-primary/5 px-8 py-8">
        <div className="mb-4 flex flex-col items-center gap-5 md:flex-row md:items-start md:justify-between md:gap-0">
          <div className="relative h-40 w-40 rounded-md border-primary shadow-lg">
            {user.dpUrl ? (
              <Image
                fill
                priority
                alt={user.fullName}
                src={user.dpUrl as string}
                className="rounded-md object-cover"
                sizes="(max-width: 160px) 100vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-600">
                <User className="h-8 w-8 text-zinc-400" />
              </div>
            )}
          </div>
          {/* Contact Info */}
          <div className="flex flex-col items-center gap-2 md:items-end">
            {user.email && (
              <div className="flex items-center gap-2 text-zinc-500">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{user.email}</span>
              </div>
            )}
            {user.location && (
              <div className="flex items-center gap-2 text-zinc-500">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{user.location}</span>
              </div>
            )}
            {user.websiteUrl && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-zinc-500" />
                <a
                  target="_blank"
                  href={user.websiteUrl}
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  {user.websiteUrl}
                </a>
              </div>
            )}
            <div className="flex items-center gap-2 text-zinc-500">
              <Calendar1 className="h-4 w-4" />
              <span className="text-sm">
                Member since {dayjs(user.createdAt).format("DD MMMM YYYY")}
              </span>
            </div>
          </div>
        </div>
        {/* Name and Title */}
        <div className="text-center md:text-left">
          <div className="flex flex-col items-center gap-3 md:flex-row md:justify-between md:gap-0">
            <h1 className="text-3xl font-bold text-white">{user.fullName}</h1>
            {currentUser ? (
              <Button asChild variant="default">
                <Link href="/user/settings/profile">
                  <UserPen className="mr-1 h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            ) : null}
          </div>
          {user.bio && (
            <p className="mt-2 text-sm text-zinc-400 md:max-w-[70%]">
              {user.bio}
            </p>
          )}
          {user.username && (
            <p className="mt-1 text-sm text-zinc-500">@{user.username}</p>
          )}
          {user.socialLinks.length ? (
            <div className="mt-2 flex items-center gap-3">
              {user.socialLinks.map((socialLink) => (
                <a
                  key={socialLink.id}
                  href={socialLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border border-dashed px-2 py-1 text-xs font-medium text-zinc-300 transition-colors hover:bg-primary/10"
                >
                  {socialLink.platform}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
      {/* Main Content */}
      <div className="px-8 py-6">
        {/* Skills Section */}
        {user.skills.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-zinc-300" />
              <h2 className="text-xl font-semibold text-white">
                Skills & Technologies
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {user.skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="bg-teal-500/10 text-teal-300 hover:bg-teal-900/20"
                >
                  {skill.name}
                </Badge>
              ))}
            </div>
          </section>
        )}
        {/* Experience Section */}
        {user.experiences.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <BriefcaseBusiness className="h-5 w-5 text-zinc-300" />
              <h2 className="text-xl font-semibold text-white">
                Professional Experience
              </h2>
            </div>
            <div className="space-y-6">
              {user.experiences.map((experience) => (
                <div
                  key={experience.id}
                  className="border-l border-dashed pl-4"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">
                          {experience.role}
                        </h3>
                        <div className="flex items-center gap-2 text-lg text-zinc-400">
                          <Building2 size={16} className="text-zinc-500" />
                          <span className="text-base text-zinc-400">
                            {experience.company}
                          </span>
                        </div>
                      </div>
                      <span className="text-sm text-zinc-500">
                        {dayjs(experience.from).format("MMM YYYY")} -{" "}
                        {experience.present
                          ? "Present"
                          : dayjs(experience.to).format("MMM YYYY")}
                      </span>
                    </div>
                    {experience.description && (
                      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                        {experience.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Projects Section */}
        {user.projects.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-zinc-300" />
              <h2 className="text-xl font-semibold text-white">Projects</h2>
            </div>
            <div className="space-y-6">
              {user.projects.map((project) => (
                <div key={project.id} className="border-l border-dashed pl-4">
                  <div>
                    <h3 className="font-semibold text-white">{project.name}</h3>
                    {project.description && (
                      <p className="mt-1 text-sm text-zinc-400">
                        {project.description}
                      </p>
                    )}
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex items-center gap-1 text-sm text-teal-400 hover:underline"
                      >
                        View Project
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        {/* Education Section */}
        {user.educations.length > 0 && (
          <section className="mb-8">
            <div className="mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-zinc-300" />
              <h2 className="text-xl font-semibold text-white">Education</h2>
            </div>
            <div className="space-y-6">
              {user.educations.map((education) => (
                <div key={education.id} className="border-l border-dashed pl-4">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white">
                          {education.institute}
                        </h3>
                      </div>
                      <span className="text-sm text-zinc-500">
                        {dayjs(education.from).format("MMM YYYY")} -{" "}
                        {education.present
                          ? "Present"
                          : dayjs(education.to).format("MMM YYYY")}
                      </span>
                    </div>
                    {education.description && (
                      <p className="mt-1 text-sm leading-relaxed text-zinc-400">
                        {education.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
