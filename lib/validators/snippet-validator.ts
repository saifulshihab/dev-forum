import { z } from "zod";

const SnippetValidator = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 150 characters"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional()
    .or(z.literal("")),
  code: z
    .string()
    .min(1, "Code is required")
    .max(10000, "Code must be at most 10000 characters"),
  language: z.string().min(1, "Language is required")
});

export { SnippetValidator };
