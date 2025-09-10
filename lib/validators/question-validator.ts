import { z } from "zod";

const QuestionValidator = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters long")
    .max(200, "Title must be at most 200 characters long"),
  content: z
    .string()
    .min(20, "Content must be at least 20 characters long")
    .max(5000, "Content must be at most 5000 characters long")
});

export { QuestionValidator };
