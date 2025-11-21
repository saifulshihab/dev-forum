"use server";

import { authCheck } from "@/auth";
import { Prisma } from "@/generated/prisma";
import prisma from "../prisma";
import { JobValidator } from "../validators/job-validator";

export async function createJob(data: Prisma.JobCreateInput) {
  try {
    await authCheck();
    const result = JobValidator.safeParse(data);
    if (result.error) {
      return { error: "Invalid job data" };
    }
    await prisma.job.create({
      data: {
        ...result.data,
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
    const job = await prisma.job.findUnique({
      where: { id: jobId },
      include: {
        tags: true,
        benefits: true,
        requirements: true,
        responsibilities: true,
        applicants: true
      }
    });
    return job;
  } catch (err: any) {
    return { error: err?.message || "Something went wrong" };
  }
}
