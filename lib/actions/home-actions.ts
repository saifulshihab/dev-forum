"use server";

import dayjs from "@/lib/dayjs";
import prisma from "../prisma";

export async function getCommunityActivity() {
  try {
    // Find latest question
    const latestQuestion = await prisma.question.findFirst({
      orderBy: { createdAt: "desc" }
    });

    // Find great answer on a question
    const fewDaysAgo = new Date();
    fewDaysAgo.setDate(fewDaysAgo.getDate() - 3);

    const greatAnswer = await prisma.answer.findFirst({
      where: {
        createdAt: { gte: fewDaysAgo }
      },
      orderBy: [{ likeCount: "desc" }, { createdAt: "desc" }],
      include: {
        question: true
      }
    });

    // Find new member joined
    const newMember = await prisma.user.findFirst({
      orderBy: { createdAt: "desc" }
    });

    return { latestQuestion, greatAnswer, newMember };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getCommunityStats() {
  try {
    // Mock community statistics - in real app, this would be calculated from database
    const totalUsers = await prisma.user.count();
    const totalQuestions = await prisma.question.count();
    const totalAnswers = await prisma.answer.count({
      where: { parentId: null }
    });

    // TODO: write query for jobs & projects count

    return {
      totalUsers,
      totalQuestions,
      totalAnswers,
      jobsPosted: 0,
      freelanceProjects: 0,
      trendingTopics: [
        "react",
        "nextjs",
        "typescript",
        "docker",
        "aws",
        "python"
      ]
    };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getCommunityHighlights() {
  try {
    // Find questions answered today
    const startOfToday = dayjs().startOf("day");
    const questionsAnsweredToday = await prisma.answer.count({
      where: { parentId: null, createdAt: { gte: startOfToday.toDate() } }
    });

    // New users this week
    const startOfWeekThisWeek = dayjs().startOf("week");
    const usersJoinedThisWeek = await prisma.user.count({
      where: { createdAt: { gte: startOfWeekThisWeek.toDate() } }
    });

    // TODO: write query to find completed projects this week

    return {
      questionsAnsweredToday,
      usersJoinedThisWeek,
      projectsCompletedThisWeek: 0
    };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}
