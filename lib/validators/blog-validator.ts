import { z } from "zod";

const BlogPostValidator = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 150 characters"),
  content: z
    .string()
    .min(20, "Content must be at least 20 characters")
    .max(50000, "Content must be at most 50000 characters")
});

const BlogCommentValidator = z.object({
  content: z
    .string()
    .min(1, "Comment is required")
    .max(2000, "Comment must be at most 2000 characters")
});

export { BlogCommentValidator, BlogPostValidator };

