import { z } from "zod";

const UserValidator = z.object({
  fullName: z.string().optional(),
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
      z
        .object({
          id: z.string().optional(),
          role: z.string().nonempty("Role is required"),
          company: z.string().nonempty("Company name in required"),
          from: z.date("Required"),
          to: z.date().optional(),
          present: z.boolean().optional(),
          description: z.string().optional()
        })
        .refine(
          (data) => {
            if (data.present === true) return true;
            return data.to !== undefined && data.to !== null;
          },
          {
            message: "Required",
            path: ["to"]
          }
        )
    )
    .optional(),
  educations: z
    .array(
      z
        .object({
          id: z.string().optional(),
          institute: z.string().nonempty("Institute name is required"),
          from: z.date("Required"),
          to: z.date().optional(),
          present: z.boolean().optional(),
          description: z.string().optional()
        })
        .refine(
          (data) => {
            if (data.present === true) return true;
            return data.to !== undefined && data.to !== null;
          },
          {
            message: "Required",
            path: ["to"]
          }
        )
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
