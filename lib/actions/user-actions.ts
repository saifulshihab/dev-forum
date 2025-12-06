"use server";

import { authCheck, nextAuthOptions } from "@/auth";
import { Prisma, UserType } from "@/generated/prisma";
import { FullUser } from "@/types";
import https from "https";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { env } from "../constants";
import prisma from "../prisma";
import { UserValidator } from "../validators/user-validator";

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
  return (await prisma.user.findUnique(args)) as FullUser;
}

export async function getCurrentUser(fetchFullUser?: boolean) {
  const { user } = await authCheck();
  if (user?.id) return await getUser(user.id, fetchFullUser);
}

async function updateUserSubEntity({
  userId,
  prismaModel,
  newItems,
  oldItems
}: {
  userId: string;
  prismaModel: any;
  newItems: any[];
  oldItems: any[];
}) {
  if (newItems?.length) {
    const removedIds = oldItems
      ?.filter((old) => !newItems.find((n) => n.id === old.id))
      .map((old) => old.id);

    if (removedIds.length) {
      await prismaModel.deleteMany({
        where: { id: { in: removedIds }, userId }
      });
    }

    for (const item of newItems) {
      if (item.id) {
        const prev = oldItems?.find((o) => o.id === item.id);
        if (prev) {
          await prismaModel.update({
            where: { id: item.id },
            data: item
          });
        }
      } else {
        await prismaModel.create({ data: { ...item, userId } });
      }
    }
  } else {
    // All items are removed, delete from db
    await prismaModel.deleteMany({ where: { userId } });
  }
}

export async function updateProfile(data: FullUser) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;

    const result = UserValidator.safeParse(data);
    if (result.error) {
      return { error: "Invalid user data" };
    }

    const userData = await getUser(user.id, true);
    const userId = user.id;

    await updateUserSubEntity({
      userId,
      prismaModel: prisma.skill,
      newItems: data?.skills ?? [],
      oldItems: userData.skills ?? []
    });

    await updateUserSubEntity({
      userId,
      prismaModel: prisma.project,
      newItems: data?.projects ?? [],
      oldItems: userData.projects ?? []
    });

    await updateUserSubEntity({
      userId,
      prismaModel: prisma.experience,
      newItems: data?.experiences ?? [],
      oldItems: userData.experiences ?? []
    });

    await updateUserSubEntity({
      userId,
      prismaModel: prisma.education,
      newItems: data?.educations ?? [],
      oldItems: userData.educations ?? []
    });

    await updateUserSubEntity({
      userId,
      prismaModel: prisma.socialLink,
      newItems: data?.socialLinks ?? [],
      oldItems: userData.socialLinks ?? []
    });

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

async function clearUserData(userId: string) {
  // Delete user profile data
  await prisma.skill.deleteMany({ where: { userId } });
  await prisma.project.deleteMany({ where: { userId } });
  await prisma.education.deleteMany({ where: { userId } });
  await prisma.socialLink.deleteMany({ where: { userId } });
  await prisma.experience.deleteMany({ where: { userId } });
  await prisma.user.delete({ where: { id: userId } });
}

export async function deleteAccount() {
  try {
    const sessionUser = await getServerSession(nextAuthOptions);
    if (!sessionUser?.user || !sessionUser.user.id) return;

    const userId = sessionUser.user.id;
    const accessToken = sessionUser?.user?.accessToken;

    if (sessionUser.user.provider === "google") {
      // revoke access of google sign in users
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
          // access revoked
          await clearUserData(userId);
        });
      });

      request.on("error", (error) => {
        return { error: error.message || "Something went wrong" };
      });

      request.write(postData);
      request.end();
    } else if (sessionUser.user.provider === "github") {
      // Revoke access of github sign in users
      const credentials = `${env.GITHUB_CLIENT_ID}:${env.GITHUB_CLIENT_SECRET}`;
      await fetch(
        `https://api.github.com/applications/${env.GITHUB_CLIENT_ID}/grant`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: `Basic ${Buffer.from(credentials).toString("base64")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            access_token: sessionUser.user.accessToken
          })
        }
      );
      // access revoked
      await clearUserData(userId);
    }
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getUsername(username: string) {
  let usernameString = username;

  const userNameExist = await prisma.user.findUnique({
    where: { username: usernameString }
  });

  if (userNameExist) {
    // Username exist, concat a number digit
    usernameString = usernameString + Math.floor(Math.random() * 10);
    await getUsername(usernameString);
  }

  return usernameString;
}

export async function checkUsernameAvailability(username: string) {
  const userNameExist = await prisma.user.findUnique({
    where: { username }
  });
  if (userNameExist) return true;
  return false;
}

export async function updateProfileType(type: UserType) {
  try {
    const sessionUser = await getServerSession(nextAuthOptions);
    if (!sessionUser?.user || !sessionUser.user.id) return;
    await prisma.user.update({
      where: { id: sessionUser.user.id },
      data: { type }
    });
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}
