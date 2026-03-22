/* eslint-disable no-console */
"use server";

import { authCheck } from "@/auth";
import { Prisma, ReactionType } from "@/generated/prisma";
import prisma from "../prisma";

export async function createQuestion(data: Prisma.QuestionCreateInput) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;
    const question = await prisma.question.create({
      data: {
        title: data.title,
        content: data.content,
        userId: user.id,
        tags: data.tags
      }
    });
    return { question };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getQuestionAnswers(questionId: string) {
  try {
    const answers = await prisma.answer.findMany({
      where: { questionId, parentId: null },
      include: {
        user: { select: { id: true, fullName: true } },
        replies: true,
        reactions: true
      },
      orderBy: { createdAt: "desc" }
    });
    return { answers };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getUserQuestions() {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;
    const questions = await prisma.question.findMany({
      where: { userId: user.id },
      include: {
        user: true,
        _count: { select: { answers: { where: { parentId: null } } } }
      }
    });
    return { questions };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function deleteQuestion(questionId: string) {
  try {
    await authCheck();
    await prisma.question.delete({ where: { id: questionId } });
    // Delete question answers
    await prisma.answer.deleteMany({ where: { questionId } });
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function addAnswer(questionId: string, content: string) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;
    const answer = await prisma.answer.create({
      data: { questionId, content, userId: user.id },
      include: {
        user: { select: { id: true, fullName: true } },
        replies: true
      }
    });
    return { answer };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

async function deleteReplies(replies: any[]) {
  for (const reply of replies) {
    // Delete replies reactions if available
    await prisma.reaction.deleteMany({
      where: { answerId: reply.id }
    });

    const deletingReply = await prisma.answer.delete({
      where: { id: reply.id },
      include: {
        user: { select: { id: true, fullName: true } },
        replies: true
      }
    });

    // Delete nested replies if available
    if (deletingReply.replies && deletingReply.replies.length) {
      await deleteReplies(deletingReply.replies);
    }
  }
}

export async function deleteAnswer(answerId: string) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;

    // Delete answer reactions if available
    await prisma.reaction.deleteMany({
      where: { answerId }
    });

    const answer = await prisma.answer.delete({
      where: { id: answerId, userId: user.id },
      include: {
        user: { select: { id: true, fullName: true } },
        replies: true
      }
    });

    // Delete answer replies if available
    if (answer.replies && answer.replies.length) {
      await deleteReplies(answer.replies);
    }
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getAnswerReplies(answerId: string) {
  const replies = await prisma.answer.findMany({
    where: { parentId: answerId },
    include: {
      user: { select: { id: true, fullName: true } },
      replies: true,
      reactions: true
    }
  });
  return replies;
}

export async function addReply(
  questionId: string,
  answerId: string,
  content: string
) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;
    await prisma.answer.update({
      where: { id: answerId },
      data: {
        replies: {
          create: {
            questionId,
            content: content,
            userId: user.id
          }
        }
      },
      include: { user: { select: { id: true, fullName: true } }, replies: true }
    });
    return getAnswerReplies(answerId);
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function toggleLike(answerId: string) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;
    const existingReaction = await prisma.reaction.findUnique({
      where: { userId_answerId: { userId: user.id, answerId } }
    });
    if (existingReaction) {
      // Update existing like
      if (existingReaction.type === ReactionType.LIKE) {
        // Remove like
        await prisma.$transaction([
          prisma.reaction.delete({
            where: { id: existingReaction.id }
          }),
          prisma.answer.update({
            where: { id: answerId },
            data: { likeCount: { decrement: 1 } }
          })
        ]);
      } else {
        await prisma.$transaction([
          prisma.reaction.update({
            where: { id: existingReaction.id },
            data: { type: ReactionType.LIKE }
          }),
          prisma.answer.update({
            where: { id: answerId },
            data: {
              likeCount: { increment: 1 },
              dislikeCount: { decrement: 1 }
            }
          })
        ]);
      }
    } else {
      // Create new like
      await prisma.$transaction([
        prisma.reaction.create({
          data: {
            userId: user.id,
            answerId,
            type: ReactionType.LIKE
          }
        }),
        prisma.answer.update({
          where: { id: answerId },
          data: { likeCount: { increment: 1 } }
        })
      ]);
    }

    const updatedAnswer = await prisma.answer.findUnique({
      where: { id: answerId },
      include: {
        user: { select: { id: true, fullName: true } },
        replies: true,
        reactions: true
      }
    });

    return { answer: updatedAnswer };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function toggleDislike(answerId: string) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;
    const existingReaction = await prisma.reaction.findUnique({
      where: { userId_answerId: { userId: user.id, answerId } }
    });

    if (existingReaction) {
      if (existingReaction.type === ReactionType.DISLIKE) {
        // Remove dislike
        await prisma.$transaction([
          prisma.reaction.delete({
            where: { id: existingReaction.id }
          }),
          prisma.answer.update({
            where: { id: answerId },
            data: { dislikeCount: { decrement: 1 } }
          })
        ]);
      } else {
        // Change like to dislike
        await prisma.$transaction([
          prisma.reaction.update({
            where: { id: existingReaction.id },
            data: { type: ReactionType.DISLIKE }
          }),
          prisma.answer.update({
            where: { id: answerId },
            data: {
              likeCount: { decrement: 1 },
              dislikeCount: { increment: 1 }
            }
          })
        ]);
      }
    } else {
      // Create new dislike
      await prisma.$transaction([
        prisma.reaction.create({
          data: {
            userId: user.id,
            answerId,
            type: ReactionType.DISLIKE
          }
        }),
        prisma.answer.update({
          where: { id: answerId },
          data: { dislikeCount: { increment: 1 } }
        })
      ]);
    }

    const answer = await prisma.answer.findUnique({
      where: { id: answerId },
      include: {
        user: { select: { id: true, fullName: true } },
        replies: true,
        reactions: true
      }
    });

    return { answer };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}
