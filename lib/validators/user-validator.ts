import { z } from "zod";

const UserValidator = z.object({
  fullName: z.string().optional(),
  email: z.email().nonempty("Email is required"),
  username: z.string().optional(),
  dob: z.date().optional(),
  bio: z.string().optional(),
  websiteUrl: z.string().optional(),
  location: z.string().optional(),
  skills: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().nonempty("Required")
      })
    )
    .optional(),
  experiences: z
    .array(
      z.object({
        id: z.string().optional(),
        role: z.string().nonempty("Role is required"),
        company: z.string().nonempty("Company name in required"),
        from: z.date("Required").nullable(),
        to: z.date().optional(),
        present: z.boolean().optional(),
        description: z.string().optional()
      })
    )
    .optional(),
  educations: z
    .array(
      z.object({
        id: z.string().optional(),
        institute: z.string().nonempty("Institute name is required"),
        from: z.date("Required").nullable(),
        to: z.date().optional(),
        present: z.boolean().optional(),
        description: z.string().optional()
      })
    )
    .optional(),
  projects: z
    .array(
      z.object({
        id: z.string().optional(),
        name: z.string().nonempty("Project name is required"),
        description: z.string().optional(),
        url: z.string().optional()
      })
    )
    .optional(),
  socialLinks: z
    .array(
      z.object({
        id: z.string().optional(),
        platform: z.string().nonempty("Platform is required"),
        url: z.string().nonempty("Link is required")
      })
    )
    .optional()
});

export { UserValidator };
