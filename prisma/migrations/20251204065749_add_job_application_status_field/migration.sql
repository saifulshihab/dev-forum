-- CreateEnum
CREATE TYPE "public"."JobApplicationStatus" AS ENUM ('PENDING', 'VIEWED', 'DECLINED');

-- AlterTable
ALTER TABLE "public"."JobApplication" ADD COLUMN     "status" "public"."JobApplicationStatus" NOT NULL DEFAULT 'PENDING';
