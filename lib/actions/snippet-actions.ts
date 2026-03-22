/* eslint-disable no-console */
"use server";

import { authCheck } from "@/auth";
import { Prisma } from "@/generated/prisma";
import prisma from "../prisma";
import { SnippetValidator } from "../validators/snippet-validator";

export async function createSnippet(
  data: { title: string; description?: string; code: string; language: string },
  tags: string[]
) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return { error: "Not authenticated" };

    const result = SnippetValidator.safeParse(data);
    if (result.error) {
      return { error: result.error.message || "Invalid snippet data" };
    }

    const snippet = await prisma.snippet.create({
      data: {
        title: result.data.title,
        description: result.data.description || null,
        code: result.data.code,
        language: result.data.language,
        tags: tags.filter((t) => t.trim() !== ""),
        userId: user.id
      }
    });

    return { snippet };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getSnippets(filters?: {
  search?: string;
  language?: string;
}) {
  try {
    const where: Prisma.SnippetWhereInput = {};

    if (filters?.language) {
      where.language = filters.language;
    }

    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { description: { contains: filters.search, mode: "insensitive" } }
      ];
    }

    const snippets = await prisma.snippet.findMany({
      where,
      include: { user: { select: { id: true, fullName: true } } },
      orderBy: { createdAt: "desc" }
    });

    return { snippets };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getSnippet(snippetId: string) {
  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id: snippetId },
      include: { user: { select: { id: true, fullName: true } } }
    });
    return snippet;
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function updateSnippet(
  snippetId: string,
  data: { title: string; description?: string; code: string; language: string },
  tags: string[]
) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return { error: "Not authenticated" };

    const result = SnippetValidator.safeParse(data);
    if (result.error) {
      return {
        error: result.error.message || "Invalid snippet data"
      };
    }

    const snippet = await prisma.snippet.update({
      where: { id: snippetId, userId: user.id },
      data: {
        title: result.data.title,
        description: result.data.description || null,
        code: result.data.code,
        language: result.data.language,
        tags: tags.filter((t) => t.trim() !== "")
      }
    });

    return { snippet };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function deleteSnippet(snippetId: string) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return { error: "Not authenticated" };
    await prisma.snippet.delete({ where: { id: snippetId, userId: user.id } });
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getUserSnippets() {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;
    const snippets = await prisma.snippet.findMany({
      where: { userId: user.id },
      include: { user: { select: { id: true, fullName: true } } },
      orderBy: { createdAt: "desc" }
    });
    return { snippets };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}
