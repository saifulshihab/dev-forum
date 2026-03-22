/*
  Warnings:

  - You are about to drop the column `requireCoverLetter` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `coverLetter` on the `JobApplication` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Job" DROP COLUMN "requireCoverLetter";

-- AlterTable
ALTER TABLE "public"."JobApplication" DROP COLUMN "coverLetter";
