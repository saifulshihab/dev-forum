import { z } from "zod";

const JobValidator = z.object({
  title: z.string().min(5).nonempty("Job title is required"),
  description: z.string().min(10).nonempty("Job description is required"),
  company: z.string().min(2).nonempty("Company name is required"),
  location: z.string().min(2).nonempty("Location is required"),
  employmentType: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "INTERNSHIP"]),
  salaryMin: z
    .number()
    .min(0)
    .transform((val) => Number(val)),
  salaryMax: z
    .number()
    .min(0)
    .transform((val) => Number(val)),
  salaryCurrency: z.string().min(2),
  salaryPeriod: z.enum(["HOURLY", "MONTHLY", "YEARLY"]).optional(),
  experienceLevel: z.enum(["ENTRY", "MID", "SENIOR"]).optional(),
  applicationDeadline: z.date().optional(),
  requireCoverLetter: z.boolean().optional(),
  tags: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string().nonempty("Required")
    })
  ),
  benefits: z.array(
    z.object({
      id: z.string().optional(),
      detail: z.string().nonempty("Required")
    })
  ),
  requirements: z.array(
    z.object({
      id: z.string().optional(),
      detail: z.string().nonempty("Required")
    })
  ),
  responsibilities: z.array(
    z.object({
      id: z.string().optional(),
      detail: z.string().nonempty("Required")
    })
  )
});

export { JobValidator };
