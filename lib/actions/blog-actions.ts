/* eslint-disable no-console */
"use server";

import { authCheck } from "@/auth";
import { Prisma } from "@/generated/prisma";
import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import {
  BlogCommentValidator,
  BlogPostValidator
} from "../validators/blog-validator";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

async function getUniquePostSlug(title: string) {
  const base = slugify(title) || "post";
  let candidate = base;
  let suffix = 2;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: candidate },
      select: { id: true }
    });
    if (!existing) return candidate;
    candidate = `${base}-${suffix++}`;
  }
}

export async function createBlogPost(
  data: { title: string; content: string },
  tags: string[]
) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return { error: "Not authenticated" };

    const result = BlogPostValidator.safeParse(data);
    if (result.error) {
      return { error: result.error.message || "Invalid blog post data" };
    }

    const slug = await getUniquePostSlug(result.data.title);

    const post = await prisma.blogPost.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        slug,
        tags: tags.filter((t) => t.trim() !== ""),
        userId: user.id
      },
      include: { user: { select: { id: true, fullName: true } } }
    });

    revalidatePath("/blogs");
    return { post };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getBlogPosts(filters?: { search?: string }) {
  try {
    const where: Prisma.BlogPostWhereInput = {};
    if (filters?.search) {
      where.OR = [
        { title: { contains: filters.search, mode: "insensitive" } },
        { content: { contains: filters.search, mode: "insensitive" } }
      ];
    }

    const posts = await prisma.blogPost.findMany({
      where,
      include: {
        user: { select: { id: true, fullName: true } },
        _count: { select: { comments: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return { posts };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getUserBlogPosts() {
  try {
    const { user } = await authCheck();
    if (!user?.id) return { error: "Not authenticated" };

    const posts = await prisma.blogPost.findMany({
      where: { userId: user.id },
      include: {
        user: { select: { id: true, fullName: true } },
        _count: { select: { comments: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return { posts };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function deleteBlogPost(postId: string) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return { error: "Not authenticated" };

    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { id: true, userId: true, slug: true }
    });
    if (!post) return { error: "Blog post not found" };
    if (post.userId !== user.id) return { error: "Not authorized" };

    await prisma.blogPost.delete({ where: { id: postId } });

    revalidatePath("/blogs");
    revalidatePath("/user/activity/blogs");
    if (post.slug) revalidatePath(`/blogs/${post.slug}`);

    return { success: true };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        user: { select: { id: true, fullName: true } },
        _count: { select: { comments: true } }
      }
    });
    return post;
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function addBlogComment(postId: string, content: string) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return { error: "Not authenticated" };

    const result = BlogCommentValidator.safeParse({ content });
    if (result.error) {
      return { error: result.error.message || "Invalid comment" };
    }

    const comment = await prisma.blogComment.create({
      data: { postId, content: result.data.content, userId: user.id },
      include: { user: { select: { id: true, fullName: true } } }
    });

    revalidatePath("/blogs");
    const post = await prisma.blogPost.findUnique({
      where: { id: postId },
      select: { slug: true }
    });
    if (post?.slug) revalidatePath(`/blogs/${post.slug}`);
    return { comment };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getBlogComments(postId: string) {
  try {
    const comments = await prisma.blogComment.findMany({
      where: { postId },
      include: { user: { select: { id: true, fullName: true } } },
      orderBy: { createdAt: "desc" }
    });
    return { comments };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}
