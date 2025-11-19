/*
  Warnings:

  - You are about to drop the column `benefits` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `requirements` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `responsibilities` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "benefits",
DROP COLUMN "requirements",
DROP COLUMN "responsibilities",
DROP COLUMN "tags";

-- CreateTable
CREATE TABLE "public"."Responsibilities" (
    "id" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Responsibilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Requirements" (
    "id" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Requirements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Benefits" (
    "id" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Benefits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Responsibilities" ADD CONSTRAINT "Responsibilities_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Requirements" ADD CONSTRAINT "Requirements_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Benefits" ADD CONSTRAINT "Benefits_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Tag" ADD CONSTRAINT "Tag_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
