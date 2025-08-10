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
