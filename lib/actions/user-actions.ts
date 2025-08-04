"use server";

import { Prisma } from "@/app/generated/prisma";
import { authCheck, nextAuthOptions } from "@/auth";
import https from "https";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export async function getUser(userId: string, fetchFullUser?: boolean) {
  await authCheck();
  const args: Prisma.UserFindUniqueArgs = {
    where: { id: userId }
  };
  if (fetchFullUser) {
    args.include = {
      skills: true,
      projects: true,
      educations: true,
      experiences: true,
      socialLinks: true
    };
  }
  return (await prisma.user.findUnique(args)) as Prisma.UserGetPayload<{
    include: {
      skills: true;
      projects: true;
      educations: true;
      experiences: true;
      socialLinks: true;
    };
  }>;
}

export async function getCurrentUser(fetchFullUser?: boolean) {
  const { user } = await authCheck();
  if (user?.id) {
    return await getUser(user.id, fetchFullUser);
  }
}

export async function updateProfile(
  data: Prisma.UserGetPayload<{
    include: {
      skills: true;
      projects: true;
      educations: true;
      experiences: true;
      socialLinks: true;
    };
  }>
) {
  try {
    const { user } = await authCheck();

    if (!user?.id) return;
    const userData = await getUser(user.id, true);
    const userId = user.id;

    // UPDATE SKILL DATA
    if (data?.skills?.length) {
      const removedSkillsIds = userData.skills
        ?.filter((skill) => !data.skills.find((data) => data.id === skill.id))
        .map((data) => data.id);

      if (removedSkillsIds.length) {
        await prisma.skill.deleteMany({
          where: { id: { in: removedSkillsIds }, userId }
        });
      }
      for (const skill of data.skills) {
        if (skill.id) {
          const prevSkill = userData.skills?.find(
            (data) => data.id === skill.id
          );
          if (prevSkill) {
            await prisma.skill.update({
              where: { id: skill.id },
              data: skill
            });
          }
        } else {
          await prisma.skill.create({ data: { ...skill, userId } });
        }
      }
    } else {
      // all skills are removed, delete from db
      await prisma.skill.deleteMany({ where: { userId } });
    }

    // UPDATE PROJECT DATA
    if (data?.projects?.length) {
      const removedProjectsIds = userData.projects
        ?.filter(
          (project) => !data.projects.find((data) => data.id === project.id)
        )
        .map((data) => data.id);

      if (removedProjectsIds.length) {
        await prisma.project.deleteMany({
          where: { id: { in: removedProjectsIds }, userId }
        });
      }

      for (const project of data.projects) {
        if (project.id) {
          const prevProject = userData.projects?.find(
            (data) => data.id === project.id
          );
          if (prevProject) {
            await prisma.project.update({
              where: { id: project.id },
              data: project
            });
          }
        } else {
          await prisma.project.create({ data: { ...project, userId } });
        }
      }
    } else {
      // all projects are removed, delete from db
      await prisma.project.deleteMany({ where: { userId } });
    }

    // UPDATE EXPERIENCE DATA
    if (data?.experiences?.length) {
      const removedExperiencesIds = userData.experiences
        ?.filter(
          (experience) =>
            !data.experiences.find((data) => data.id === experience.id)
        )
        .map((data) => data.id);

      if (removedExperiencesIds.length) {
        await prisma.experience.deleteMany({
          where: { id: { in: removedExperiencesIds }, userId }
        });
      }

      for (const experience of data.experiences) {
        if (experience.id) {
          const prevExperience = userData.experiences?.find(
            (data) => data.id === experience.id
          );
          if (prevExperience) {
            await prisma.experience.update({
              where: { id: experience.id },
              data: experience
            });
          }
        } else {
          await prisma.experience.create({ data: { ...experience, userId } });
        }
      }
    } else {
      // all experiences are removed, delete from db
      await prisma.education.deleteMany({ where: { userId } });
    }

    // UPDATE EDUCATION DATA
    if (data?.educations?.length) {
      const removedEducationsIds = userData.educations
        ?.filter(
          (education) =>
            !data.educations.find((data) => data.id === education.id)
        )
        .map((data) => data.id);

      if (removedEducationsIds.length) {
        await prisma.education.deleteMany({
          where: { id: { in: removedEducationsIds }, userId }
        });
      }

      for (const education of data.educations) {
        if (education.id) {
          const prevEducation = userData.educations?.find(
            (data) => data.id === education.id
          );
          if (prevEducation) {
            await prisma.education.update({
              where: { id: education.id },
              data: education
            });
          }
        } else {
          await prisma.education.create({ data: { ...education, userId } });
        }
      }
    } else {
      // all educations are removed, delete from db
      await prisma.education.deleteMany({ where: { userId } });
    }

    // UPDATE SOCIAL LINKS DATA
    if (data?.socialLinks?.length) {
      const removedSocialLinksIds = userData.socialLinks
        .filter(
          (socialLink) =>
            !data.socialLinks.find((data) => data.id === socialLink.id)
        )
        .map((data) => data.id);

      if (removedSocialLinksIds.length) {
        await prisma.socialLink.deleteMany({
          where: { id: { in: removedSocialLinksIds }, userId }
        });
      }

      for (const socialLink of data.socialLinks) {
        if (socialLink.id) {
          const prevSocialLink = userData.socialLinks?.find(
            (data) => data.id === socialLink.id
          );
          if (prevSocialLink) {
            await prisma.socialLink.update({
              where: { id: socialLink.id },
              data: socialLink
            });
          }
        } else {
          await prisma.socialLink.create({ data: { ...socialLink, userId } });
        }
      }
    } else {
      // all social links are removed, delete from db
      await prisma.socialLink.deleteMany({ where: { userId } });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        fullName: data.fullName,
        username: data.username,
        dob: data.dob,
        bio: data.bio,
        websiteUrl: data.websiteUrl,
        location: data.location
      }
    });
    revalidatePath("/user/profile");
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function deleteAccount() {
  try {
    const sessionUser = await getServerSession(nextAuthOptions);
    if (!sessionUser?.user || !sessionUser.user.id) return;

    const userId = sessionUser.user.id;
    const accessToken = sessionUser?.user?.accessToken;

    const postData = "token=" + accessToken;
    const requestOptions = {
      host: "oauth2.googleapis.com",
      port: "443",
      path: "/revoke",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData)
      }
    };

    const request = https.request(requestOptions, function (res) {
      res.setEncoding("utf8");
      res.on("data", async () => {
        // revoke successful, delete user profile data from database
        await prisma.skill.deleteMany({ where: { userId } });
        await prisma.project.deleteMany({ where: { userId } });
        await prisma.education.deleteMany({ where: { userId } });
        await prisma.socialLink.deleteMany({ where: { userId } });
        await prisma.experience.deleteMany({ where: { userId } });

        await prisma.user.delete({ where: { id: userId } });
      });
    });

    request.on("error", (error) => {
      return { error: error.message || "Something went wrong" };
    });

    request.write(postData);
    request.end();
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}
