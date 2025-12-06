"use server";

import { authCheck } from "@/auth";
import { JobApplicationStatus, Prisma, UserType } from "@/generated/prisma";
import dayjs from "@/lib/dayjs";
import prisma from "../prisma";
import { JobValidator } from "../validators/job-validator";

// Create a new job posting
export async function createJob(data: Prisma.JobCreateInput) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;

    if (user.type !== UserType.RECRUITER) {
      return { error: "You are not authorized to perform this action." };
    }

    const result = JobValidator.safeParse(data);
    if (result.error) {
      return { error: "Invalid job data" };
    }
    await prisma.job.create({
      data: {
        ...result.data,
        userId: user.id,
        tags: {
          create: result.data.tags
        },
        requirements: {
          create: result.data.requirements
        },
        responsibilities: {
          create: result.data.responsibilities
        },
        benefits: {
          create: result.data.benefits
        }
      } as any
    });
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

export async function getJob(jobId: string) {
  try {
    return await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        tags: true,
        benefits: true,
        requirements: true,
        jobApplications: true,
        responsibilities: true
      }
    });
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

// Apply for a job
export async function applyJob(jobId: string, coverLetter?: string) {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;
    const userId = user.id;

    if (user.type !== UserType.DEVELOPER) {
      return { error: "You are not authorized to perform this action." };
    }

    // Check if the user already applied
    const existingApplication = await prisma.jobApplication.findFirst({
      where: {
        jobId,
        userId
      }
    });

    if (existingApplication) {
      return { error: "You have already applied for this job." };
    }

    // Check if the job is posted by this user
    const employer = await prisma.job.findUnique({
      where: { id: jobId, userId }
    });

    if (employer) {
      return { error: "You cannot apply to your own job posting." };
    }

    // Check if the application deadline has passed
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (job && dayjs(job.applicationDeadline).isBefore(dayjs())) {
      return { error: "The application deadline for this job has passed." };
    }

    // Create the job application
    await prisma.jobApplication.create({
      data: { jobId, userId, coverLetter }
    });
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

// Get jobs posted by the recruiter
export async function getRecruiterUserJobs() {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;
    const jobs = await prisma.job.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        title: true,
        company: true,
        applicationDeadline: true
      }
    });
    return { jobs };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

// Get jobs applied by developer user
export async function getDeveloperUserJobs() {
  try {
    const { user } = await authCheck();
    if (!user?.id) return;
    const jobs = await prisma.jobApplication.findMany({
      where: { userId: user.id },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            company: true
          }
        }
      }
    });
    return { jobs };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

// Get applications for a specific job
export async function getJobApplications(jobId: string) {
  try {
    await authCheck();
    const applications = await prisma.jobApplication.findMany({
      where: { jobId },
      include: {
        user: {
          select: { id: true, fullName: true, dpUrl: true, email: true }
        }
      }
    });
    return { applications };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

// Get jobs with filtering
export async function getJobs(filters?: {
  employmentType?: string;
  experienceLevel?: string;
  location?: string;
  company?: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency?: string;
  salaryPeriod?: string;
  tag?: string;
  search?: string;
}) {
  try {
    const where: any = {};
    const orConditions: any[] = [];

    if (filters?.employmentType) {
      where.employmentType = filters.employmentType;
    }

    if (filters?.experienceLevel) {
      where.experienceLevel = filters.experienceLevel;
    }

    if (filters?.location) {
      where.location = {
        contains: filters.location,
        mode: "insensitive"
      };
    }

    if (filters?.company) {
      where.company = {
        contains: filters.company,
        mode: "insensitive"
      };
    }

    if (filters?.salaryMin !== undefined || filters?.salaryMax !== undefined) {
      const salaryFilter: any = {};
      if (filters?.salaryMin !== undefined) {
        salaryFilter.salaryMax = { gte: filters.salaryMin };
      }
      if (filters?.salaryMax !== undefined) {
        salaryFilter.salaryMin = { lte: filters.salaryMax };
      }
      where.AND = where.AND || [];
      where.AND.push(salaryFilter);
    }

    if (filters?.salaryCurrency) {
      where.salaryCurrency = filters.salaryCurrency;
    }

    if (filters?.salaryPeriod) {
      where.salaryPeriod = filters.salaryPeriod;
    }

    if (filters?.tag) {
      where.tags = {
        some: {
          name: {
            contains: filters.tag,
            mode: "insensitive"
          }
        }
      };
    }

    if (filters?.search) {
      orConditions.push(
        {
          title: {
            contains: filters.search,
            mode: "insensitive"
          }
        },
        {
          description: {
            contains: filters.search,
            mode: "insensitive"
          }
        },
        {
          company: {
            contains: filters.search,
            mode: "insensitive"
          }
        }
      );
    }

    if (orConditions.length > 0) {
      where.OR = orConditions;
    }

    const jobs = await prisma.job.findMany({
      where,
      orderBy: {
        createdAt: "desc"
      }
    });

    return { jobs };
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

// Delete a job and its associated applications
export async function deleteJob(jobId: string) {
  try {
    await authCheck();
    // Delete job applications associated with the job
    await prisma.jobApplication.deleteMany({ where: { jobId } });
    // Delete the job
    await prisma.job.delete({ where: { id: jobId } });
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}

// Mark a job application as viewed
export async function markJobApplicationViewed(applicationId: string) {
  try {
    await authCheck();
    await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status: JobApplicationStatus.VIEWED }
    });
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}
