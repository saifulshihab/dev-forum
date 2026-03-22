import { Prisma } from "@/generated/prisma";

export type FullUser = Prisma.UserGetPayload<{
  include: {
    skills: true;
    projects: true;
    educations: true;
    experiences: true;
    socialLinks: true;
  };
}>;

export type FullQuestion = Prisma.QuestionGetPayload<{
  include: { user: true; answers: true };
}>;

export type FullAnswer = Prisma.AnswerGetPayload<{
  include: {
    parent: true;
    question: true;
    replies: { include: { user: true; reactions: true } };
    user: true;
    reactions: true;
  };
}>;

export type FullJob = Prisma.JobGetPayload<{
  include: {
    tags: true;
    benefits: true;
    requirements: true;
    jobApplications: true;
    responsibilities: true;
  };
}>;

export type SnippetWithUser = Prisma.SnippetGetPayload<{
  include: { user: { select: { id: true; fullName: true } } };
}>;

export type JobsPageSearchParams = {
  employmentType?: string;
  experienceLevel?: string;
  location?: string;
  company?: string;
  salaryMin?: string;
  salaryMax?: string;
  salaryCurrency?: string;
  salaryPeriod?: string;
  tag?: string;
  search?: string;
};
